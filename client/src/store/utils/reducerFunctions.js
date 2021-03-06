export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  const conversation = state.find(convo => convo.id === message.conversationId);
  if (!conversation) {
    return state;
  }
  const newConversation = {
    ...conversation,
    unreadCount: conversation.unreadCount + 1,
    messages: (conversation.messages && [message, ...conversation.messages]) || [],
    latestMessageText: message.text,
  };
  return [
    newConversation,
    ...state.filter(convo => convo.id !== message.conversationId),
  ]
};

export const setConversationReadToStore = (state, payload) => {
  const { conversationId } = payload;
  const conversation = state.find(convo => convo.id === conversationId);
  if (!conversation) {
    return state;
  }

  const newMessagesState = conversation.messages.map(message => ({
    ...message,
    read: true
  }));

  const messagesRead = conversation.messages.filter(message => message.senderId !== conversation.otherUser.id);
  const lastReadMessageId = messagesRead[messagesRead.length - 1].id;
  return [
    {
      ...conversation,
      messages: newMessagesState,
      unreadCount: 0,
      lastReadMessageId: lastReadMessageId
    },
    ...state.filter(convo => convo.id !== conversationId),
  ]
}

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      convo.id = message.conversationId;
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return convo;
    } else {
      return convo;
    }
  });
};

import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const lastReadMessageId = getLastReadMessageId(messages, userId);
  return (
    <Box>
      {messages.sort(compareTwoMessages)
      .map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} isLastReadMessage={message.id === lastReadMessageId}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const getLastReadMessageId = (messages, userId) => {
  const readMessages = messages.filter(message => message.senderId === userId && message.read === true).sort((message1, message2) => message1.id - message2.id);
  return (readMessages && readMessages.length && readMessages[readMessages.length - 1].id) || null;
} 

const compareTwoMessages = (left, right) => moment(left.createdAt).diff(moment(right.createdAt));

export default Messages;

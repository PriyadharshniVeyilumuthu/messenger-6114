import React from "react";
import { Box, Typography } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { markConversationAsRead } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  bubble: {
    fontSize: 13,
    background: "#3F92FF",
    outlineWidth: "48px",
    borderRadius: "48px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
    margin: "10px",
    color: "white"
  },
}));

const Chat = (props) => {

  const classes = useStyles();
  const { conversation, user } = props;
  const { otherUser } = conversation;
  const unreadMessageCount = getUnreadMessageCount(conversation, user);
 
  const handleClick = async (conversation) => {
    if (unreadMessageCount > 0) {
      await props.markConversationRead({
        conversationId: conversation.id
      });
    }
    await props.setActiveChat(conversation.otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {unreadMessageCount !== 0 ? <Typography className={classes.bubble}>{`${unreadMessageCount}`}</Typography> : null }
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    markConversationRead: (body) => dispatch(markConversationAsRead(body))
  };
};

export const getUnreadMessageCount = (conversation, user) => (conversation && user && conversation.messages && conversation.messages.filter(message => message.senderId !== user.id && !message.read).length) || 0;

export default connect(null, mapDispatchToProps)(Chat);

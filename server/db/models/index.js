const Group = require("./groups/group");
const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Members = require("./groups/members");
const GroupMessage = require("./groups/groupMessages");

// associations

User.hasMany(Conversation);
User.hasMany(Members);

GroupMessage.belongsTo(User, { as: "sender"})
GroupMessage.belongsTo(Group, { as: "group"})

Members.belongsTo(User, { as: "user"});
Members.belongsTo(Group, { as: "group"});

Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  Group,
  Members,
  GroupMessage
};

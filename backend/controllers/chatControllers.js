import Chat from "../models/chatModel.js";

// Add Chat | POST | Private

const createChat = async (req, res) => {
  const { userId, title } = req.body;
  const newChat = await Chat.create({
    user_id: userId,
    title,
  });
  res.status(200).json(newChat);
};

// Get Chats | GET | Private

const getChats = async (req, res) => {
  const chats = await Chat.findAll({ where: { user_id: req.params.userId } });
  res.status(200).json(chats);
};

// Delete Chat | DELETE | Private

const deleteChat = async (req, res) => {
  const { id } = req.body;
  const deleteChat = await Chat.destroy({ where: { id } });
  res.status(200).json(deleteChat);
};

export { createChat, getChats, deleteChat };

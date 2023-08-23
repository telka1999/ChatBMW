import Message from "../models/messageModel.js";

// Add Message | POST | Private

const createMessage = async (req, res) => {
  const { userId, chatId, message, role } = req.body;
  const newMessage = await Message.create({
    user_id: userId,
    chat_id: chatId,
    message,
    role,
  });
  res.status(200).json(newMessage);
};

// Get Messages | GET | Private

const getMessages = async (req, res) => {
  const messages = await Message.findAll({
    where: { chat_id: req.params.chatId },
  });
  res.status(200).json(messages);
};

// Delete Messages | DELETE | Private

const deleteMessages = async (req, res) => {
  const { chatId } = req.body;
  const deleteMessages = await Message.destroy({ where: { chat_id: chatId } });
  res.status(200).json(deleteMessages);
};

export { createMessage, getMessages, deleteMessages };

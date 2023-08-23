import Message from "../models/messageModel.js";

// Add Message | POST | Private

const createMessage = async (req, res) => {
  const { userId, chatId, message, role } = req.body;
  try {
    const newMessage = await Message.create({
      user_id: userId,
      chat_id: chatId,
      message,
      role,
    });
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Messages | GET | Private

const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { chat_id: req.params.chatId },
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Messages | DELETE | Private

const deleteMessages = async (req, res) => {
  const { chatId } = req.body;
  const deleteMessages = await Message.destroy({ where: { chat_id: chatId } });
  if (deleteMessages) {
    res.status(200).json(deleteMessages);
  } else {
    res.status(404).json({ message: "Messages not found" });
  }
};

export { createMessage, getMessages, deleteMessages };

import Message from "../models/messageModel.js";
import openai from "../config/openai.js";

// Add Message | POST | Private

const createMessage = async (req, res) => {
  const { userId, chatId, message } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "This is a test" }],
      model: "gpt-3.5-turbo",
    });
    const newMessage = await Message.create({
      user_id: userId,
      chat_id: chatId,
      message,
      answer: completion.choices[0].message.content,
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

export { createMessage, getMessages };

import openai from "../config/openai.js";

// Create Chat Completion | POST | Private

const createChatCompletion = async (req, res) => {
  try {
    const { question } = req.body;
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "This is a test" }],
      model: "gpt-3.5-turbo",
    });
    res.status(200).json(completion.choices.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createChatCompletion };

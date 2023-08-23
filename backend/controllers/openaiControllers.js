// Create Chat Completion | POST | Private

const createChatCompletion = async (req, res) => {
  try {
    const { question } = req.body;
    // Openai magic
    res.status(200).json({ message: "Chat Completion" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createChatCompletion };

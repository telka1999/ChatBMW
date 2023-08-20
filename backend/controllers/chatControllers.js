const createChat = async (req, res) => {
  res.status(200).json({ message: "This is protectet route" });
};

export { createChat };

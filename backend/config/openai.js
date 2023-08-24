import OpenAi from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAi({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export default openai;

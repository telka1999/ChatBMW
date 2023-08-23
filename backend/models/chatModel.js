import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Chat = sequelize.define("chats", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Chat;

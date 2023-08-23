import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Message = sequelize.define("messages", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chat_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKeyL: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Message;

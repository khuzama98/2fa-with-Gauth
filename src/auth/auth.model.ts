import * as mongoose from "mongoose";

export const AuthSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

export interface Auth {
  email: string;
}

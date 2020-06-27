import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "./auth.model";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import * as speakeasy from "speakeasy";

@Injectable()
export class AuthService {
  products: Auth[] = [];
  users: any = [];
  constructor(@InjectModel("Auth") private readonly authModel: Model<Auth>) {}

  generateSecret = email => {
    try {
      const secret = speakeasy.generateSecret();
      const user = {
        base32secret: secret.base32,
        email
      };
      this.users.push(user);
      return secret.otpauth_url;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  verifyToken = async (email, token) => {
    try {
      const user = this.users.filter(item => item.email === email);
      console.log(user);
      if (user.length) {
        const verified = speakeasy.totp.verify({
          secret: user[0].base32secret,
          encoding: "base32",
          token: token
        });
        if (verified) {
          const uniqueMail = await this.authModel.findOne({ email });

          if (!uniqueMail) {
            const newUser = new this.authModel(email);
            const user = await this.authModel.create(newUser);
          }
        }
        return verified;
      }
      return "user not found";
    } catch (e) {
      console.log(e);
      return "";
    }
  };

}

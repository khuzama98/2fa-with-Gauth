import {
  Controller,
  Post,
  Body,
} from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/generateSecret")
  async generate(@Body("email") email: string) {
    try {
      const res = this.authService.generateSecret(email);
      if (res) {
        return { status: 200, data: res };
      }
      return { status: 400, data: [] };
    } catch (error) {
      return error;
    }
  }

  @Post("/verify")
  async verifyToken(@Body("email") email: string,@Body("token") token: string) {
    try {
      const res = await this.authService.verifyToken(email,token);
      if (typeof res == "boolean" ) {
        return { status: 200, data: res };
      }
      return { status: 400, data: [] };
    } catch (error) {
      return error;
    }
  }

}

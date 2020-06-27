import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('')],
  controllers: [
        AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactoModule } from './contacto/contacto.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ContactoModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/contactos'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

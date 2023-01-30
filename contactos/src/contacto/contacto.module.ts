import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { ContactoController } from './contacto.controller';
import { ContactoService } from './contacto.service';
import { ContactoSchema } from './schema/contacto.schema';

@Module({
  controllers: [ContactoController],
  providers: [ContactoService, ContactoController],
  imports: [
    MongooseModule.forFeature([{ name: 'Contacto', schema: ContactoSchema }]),
  ],
})
export class ContactoModule {}

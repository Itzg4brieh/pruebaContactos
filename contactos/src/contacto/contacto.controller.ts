import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Res,
  Req,
  Session,
} from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { ContactoDto } from './dto/contacto-dto/contacto-dto';

@Controller('contactos')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  usuarios = [
    { usuario: 'nacho', password: '12345' },
    { usuario: 'pepe', password: 'pepei11i' },
  ];

  // GET /contacto
  @Get()
  async listar(@Res() res) {
    const resultado = await this.contactoService.listar();
    return res.render('contactos_listado', { contactos: resultado });
  }

  // GET /contacto/buscar/:id
  @Get('/:id')
  async buscarPorId(@Res() res, @Param('id') id: string) {
    const resultado = await this.contactoService.buscarPorId(id);
    return res.render('contactos_ficha', { contacto: resultado });
  }

  //Editar /editar/:id
  @Get('/editar/:id')
  async paginaEdicion(@Res() res, @Param('id') id: string) {
    const resultado = await this.contactoService.buscarPorId(id);
    if (resultado)
      return res.render('contactos_editar', { contacto: resultado });
  }

  @Post('login')
  async login(@Res() res, @Req() req, @Body() body) {
    const usu = body.usuario;
    const pass = body.password;
    const existe = this.usuarios.filter(
      (usuario) => usuario.usuario == usu && usuario.password == pass,
    );

    if (existe.length > 0) {
      req.session.usuario = existe[0].usuario;
      this.listar(res);
    } else {
      res.render('iniciarSesion', {
        error: 'Error usuario o contraseña incorrecta',
      });
    }
  }

  @Get('/nuevo')
  async crearContacto(@Res() res, @Session() session) {
    if (!session.usuario)
      return res.render('login', { error: 'El usuario debe estar logueado' });
    return res.render('contactos_nuevo');
  }

  @Post('contactos')
  async insertarContacto(@Res() res, @Body() body) {
    try {
      const resultado = await this.contactoService.insertar(body);
      return res.render('contactos_ficha', { contacto: resultado });
    } catch (error) {
      res.render('error', { error: 'Error al insertar el contacto' });
    }
  }
  //POST /contactos
  // @Post()
  // async crear(@Body() crearContactoDto: ContactoDto) {
  //   return this.contactoService.insertar(crearContactoDto);
  // }
}
// // PUT /contacto/:id
// @Put(':id')
// actualizar(
//   @Param('id') id: string,
//   @Body() actualizarContactoDto: ContactoDto,
// ) {
//   return this.contactoService.actualizar(id, actualizarContactoDto);
// }

// // DELETE /contacto/:id
// @Delete(':id')
// borrar(@Param('id') id: string) {
//   return this.contactoService.borrar(id);
// }

// function Session() {
//   throw new Error('Function not implemented.');
// }
// function crearContacto() {
//   throw new Error('Function not implemented.');
// }

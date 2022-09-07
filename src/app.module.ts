import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RindegastosService } from './rindegastos/services/rindegastos.service';
import { RindegastosController } from './rindegastos/controller/rindegastos.controller';

@Module({
  imports: [],
  controllers: [AppController, RindegastosController],
  providers: [AppService, RindegastosService],
})
export class AppModule {}

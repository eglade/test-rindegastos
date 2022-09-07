import { Controller, Get, Req } from '@nestjs/common';
import { RindegastosService } from '../services/rindegastos.service';
import { Request } from 'express';

@Controller('rindegastos')
export class RindegastosController {
    constructor(private rindegastosService: RindegastosService) {}

    /**
     * Servicio que recibe monto en moneda original (ej USD) y retorna conversión a una moneda final (ej CLP).
     * @param request 
     * @returns 
     */
    @Get('getConvertedAmount') 
    getConvertedAmount(@Req() request: Request) { 
        return this.rindegastosService.getConvertedAmount(request.query); 
    }  
    
    /**
     * Servicio que retorna los días faltan para un determinado cumpleaños, en relacion a la fecha de hoy.
     * @param request 
     * @returns 
     */
    @Get('getDaysUntilMyBirthday') 
    getDaysUntilMyBirthday(@Req() request: Request) { 
        return this.rindegastosService.getDaysUntilMyBirthday(request.query); 
    }  

    /**
     * Servicio que retorna el producto concatenado de la multiplicación de cada uno de los resultados (los primeros 9).
     * @param request 
     * @returns 
     */
    @Get('getTheNumber') 
    getTheNumber(@Req() request: Request) {
        return this.rindegastosService.getTheNumber(request.query); 
    }      

    
}

import { Controller, Get, Req } from '@nestjs/common';
import { RindegastosService } from '../services/rindegastos.service';
import { Request } from 'express';

@Controller('rindegastos')
export class RindegastosController {
    constructor(private rindegastosService: RindegastosService) {}

    /**
     * Servicio que recibe monto en moneda original (ej USD) y retorna conversión a una moneda final (ej CLP).
     */
    @Get('getConvertedAmount') 
    getConvertedAmount(@Req() request: Request) { 
        return this.rindegastosService.getConvertedAmount(request.query); 
    }     
    
    /**
     * Servicio que retorna los días faltan para un determinado cumpleaños, en relacion a la fecha de hoy.
     */
    @Get('getDaysUntilMyBirthday') 
    getDaysUntilMyBirthday(@Req() request: Request) { 
        return this.rindegastosService.getDaysUntilMyBirthday(request.query); 
    }  

    /**
     * Servicio que retorna el producto concatenado de la multiplicación de cada uno de los resultados (los primeros 9).
     */
    @Get('getTheNumber') 
    getTheNumber(@Req() request: Request) {
        return this.rindegastosService.getTheNumber(request.query); 
    }      

    /**
     * Prueba en otra API (comparación de resultados) - DEPRECATED
     */
     @Get('getConvertedAmountOtherApi') 
     getConvertedAmountOtherApi(@Req() request: Request) { 
         return this.rindegastosService.getConvertedAmountOtherApi(request.query); 
     }      
    
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { getApiKey } from "../../helpers/getApiKey";


@Injectable()
export class RindegastosService {

    /**
     * Servicio que recibe monto en moneda original (ej USD) y retorna conversión a una moneda final (ej CLP).
     * @param params - parametros para la peticion
     * @returns objeto con resultado de converción
     */
    async getConvertedAmount(params): Promise<object> { 
        // variables para API - api.apilayer.com
        const baseUrl = getApiKey._BASEURL;
        const apiKey  = getApiKey._KEY;
        const srcUrl  = getApiKey._SRCURL;
        
        // variables
        const amount = parseInt(params.amount);        

        // validacion parametros
        if ((typeof params.from === 'undefined') || (typeof params.to === 'undefined') || (typeof params.amount === 'undefined') || isNaN(params.amount) || amount <= 0 ) {
            return {
                response : 'Error',
                message : 'Los parametros enviados no son invalidos. Recordar que el monto deben ser numerico mayor a 0',
                example: '.../api/rindegastos/getConvertedAmount?from=CLP&to=USD&amount=200000',
            }
        }

        // consulta API - api.apilayer.com 
        const apiResponse = await axios.get(`${baseUrl}to=${params.to}&from=${params.from}&amount=${params.amount}&apikey=${apiKey}`);        
                
        // retorno principal
        return {
            response : 'Exito',
            message : `Los ${params.amount} (${params.from}) ingresados corresponden a ${apiResponse.data.result} (${params.to})`,
            src: srcUrl,
            data : apiResponse.data
        }
    }  

    /**
     * Servicio que retorna los días faltan para un determinado cumpleaños, en relacion a la fecha de hoy.
     * @param params - parametros para la peticion
     * @returns objeto con resultado y diferencia de días
     */
    getDaysUntilMyBirthday(params): object { 
        // Validación parametros
        if ( (typeof params.birthdate === 'undefined') ) {
            return  {
                response : 'Error',
                message  : 'No se encontro parametro [birthdate]',             
            }
        } 

        // Validación de fecha de cumpleaños
        const currentDate       = moment();
        const dateIn            = params.birthdate.split('-');               
        const birthDate         = moment(`${dateIn[2]}-${dateIn[1]}-${dateIn[0]}`); 
        const birthDateThisYear = moment(`${currentDate.year()}-${dateIn[1]}-${dateIn[0]}`);
        const diffDay           = birthDateThisYear.diff(currentDate, 'days');   

        // Validación parametros necesarios
        if((dateIn.length !== 3) || (!birthDate.isValid()) || (!birthDateThisYear.isValid())){
            return  {
                response : 'Error',
                message  : 'fecha ingresada no es valida. Formato [DD-MM-AAAA]. Ej ...api/rindegastos/getDaysUntilMyBirthday?birthdate=07-09-1988',
            }
        }

        // retorno principal
        return  {
            response : 'Exito',
            message  : (diffDay >= 0)?`Quedan ${diffDay} días para tu cumpleaños.`:`Tu cumpleaños pasó hace ${(diffDay*-1)} días.`,
            data : {
                diffDay: diffDay,
                birthDate : params.birthdate.replaceAll('-', '/'),
                birthDateThisYear : birthDateThisYear.format('L')
            }
        }            
        
    
    }   

    /**
     * Servicio que retorna el producto concatenado de la multiplicación de cada uno de los resultados (los primeros 9).
     * @param params - parametros para la peticion
     * @returns objeto con resultado con string concatendado de los primeros 9 caracteres
     */
    getTheNumber(params): object { 
        // variables
        const first = parseInt(params.first);
        const second = parseInt(params.second);
        const multiplicationResults = [];

        // Validación parametro
        if ( (typeof params.first === 'undefined') || (typeof params.second === 'undefined') || isNaN(params.first) || isNaN(params.second) || first <= 0 || second <= 0 ) {
            return  {
                response : 'Error',
                message : 'Los parametros enviados no son invalidos. Recordar que ambos deben ser numericos mayor a 0',
                example: '.../api/rindegastos/getTheNumber?first=192&second=3',            
            }
        } 

        // recorrido y multiplicación
        for (let i = 1; i <= second; i++) {
            multiplicationResults.push((first* i));
        }

        // respuesta
        const result = multiplicationResults.join('').substring(0, 9);

        // retorno principal
        return {
            response : 'Exito',
            message : `El texto concatenado pedido es [${result}]`,
            result : result,
            totalResults : multiplicationResults
        };
    }       
}

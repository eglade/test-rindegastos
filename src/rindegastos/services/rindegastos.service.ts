import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { getApiKeyApilayer } from 'src/helpers/getApiKeyApilayer';
import { getApiKeyOpenex } from 'src/helpers/getApiKeyOpenex';

@Injectable()
export class RindegastosService {

    /**
     * Servicio que recibe monto en moneda original (ej USD) y retorna conversión a una moneda final (ej CLP).
     * @param params - parametros para la peticion
     * @returns objeto con resultado de converción
     */
     async getConvertedAmount(params): Promise<object> { 
        // API - openexchangerates.org
        const {_BASEURL, _APIKEY, _SRCURL} = getApiKeyOpenex;        
        const apiResponse = await axios.get(`${_BASEURL}app_id=${_APIKEY}`); 
        
        // variables
        const amountFromUSD = Object.getOwnPropertyDescriptor(apiResponse.data.rates, params.from);
        const amountToUSD   = Object.getOwnPropertyDescriptor(apiResponse.data.rates, params.to);
        const amount        = parseInt(params.amount);
        
        // validacion parametros
        if ((typeof params.from === 'undefined') || (typeof params.to === 'undefined') || (typeof params.amount === 'undefined') || (typeof amountFromUSD === 'undefined') || (typeof amountToUSD === 'undefined') || isNaN(params.amount) || amount <= 0 ) {
            return {
                response : 'Error',
                message : 'Los parametros enviados no son invalidos. Recordar que el monto deben ser numerico mayor a 0',
                example: '.../api/rindegastos/getConvertedAmount?from=CLP&to=USD&amount=200000',
                badge: apiResponse.data.rates
            }
        }

        // calculo de divisa en base a Dolar
        const result = ((amount/amountFromUSD.value)*amountToUSD.value).toFixed(2);
        
        // retorno principal
        return {
            response : 'Exito',
            message : `Los ${params.amount} (${params.from}) ingresados corresponden a ${result} (${params.to})`,
            src: _SRCURL,
            data : {
                result : result 
            }
        }
    }    

    /**
     * Servicio que retorna los días faltan para un determinado cumpleaños, en relacion a la fecha de hoy.
     * @param params - parametros para la peticion
     * @returns objeto con resultado y diferencia de días
     */
    getDaysUntilMyBirthday(params): object { 
        // validación parametros
        if ( (typeof params.birthdate === 'undefined') ) {
            return  {
                response : 'Error',
                message  : 'No se encontro parametro [birthdate]',             
            }
        } 

        // variables
        const currentDate       = moment();
        const dateIn            = params.birthdate.split('-');               
        const birthDate         = moment(`${dateIn[2]}-${dateIn[1]}-${dateIn[0]}`); 
        const birthDateThisYear = moment(`${currentDate.year()}-${dateIn[1]}-${dateIn[0]}`);
        const diffDay           = birthDateThisYear.diff(currentDate, 'days');   

        // validación de fecha de cumpleaños
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
    

    /**
     * Prueba en otra API (comparación de resultados) - DEPRECATED
     */
    async getConvertedAmountOtherApi(params): Promise<object> { 
        // variables para API - api.apilayer.com
        const {_BASEURL, _APIKEY, _SRCURL} = getApiKeyApilayer;
        
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
        const apiResponse = await axios.get(`${_BASEURL}to=${params.to}&from=${params.from}&amount=${params.amount}&apikey=${_APIKEY}`);
      
        // retorno principal
        return {
            response : 'Exito',
            message : `Los ${params.amount} (${params.from}) ingresados corresponden a ${apiResponse.data.result} (${params.to})`,
            src: _SRCURL,
            data : apiResponse.data
        }
    }
}

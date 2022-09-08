# README

## Consideraciones generales.
- node.js version `v16.16.0`.
- nest.js version `v9.1.2`.
- url base `http://localhost:3000/api/`.
- servicio (unico) `rindegastos`.
- dependecias - `npm install`.
- `npm run start:dev`

## Requerimiento 1
- El nombre del endpoint es `api/rindegastos/getConvertedAmount`
- Ejemplo de uso; `http://localhost:3000/api/rindegastos/getConvertedAmount?from=CLP&to=USD&amount=200000`
- Se utiliza API para tranformación actual de moneda desde - `https://apilayer.com/marketplace/exchangerates_data-api/`
- Se pueden obtener todos los simbolos de para los distintos tipos de moneda aquí: `https://api.apilayer.com/exchangerates_data/symbols?apikey=CAHgPd4YGIQ5DEHRtLnl4Zonaa7xd5Ev`.

## Requerimiento 2
- El nombre del endpoint es `api/rindegastos/getDaysUntilMyBirthday`
- Ejemplo de uso; `http://localhost:3000/api/rindegastos/getDaysUntilMyBirthday?birthdate=15-11-1988`
- El formato de la fecha de cumpleaños es `AA-MM-AAAA`.
 
## Requerimiento 3
- El nombre del endpoint es `api/rindegastos/getTheNumber`
- Ejemplo de uso; `http://localhost:3000/api/rindegastos/getTheNumber?first=9&second=34`
- Las variables de en trada `first` y `second` deben ser numericas mayor a cero. 
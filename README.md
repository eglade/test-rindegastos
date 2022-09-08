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
- La variable de entrada `amount` debe ser numerica mayor a cero. 
- Las variables de entrada `from` y `to` deben estar dentro de las presentadas en la API - `https://openexchangerates.org/api/latest.json?app_id=[APP_ID]`

## Requerimiento 2
- El nombre del endpoint es `api/rindegastos/getDaysUntilMyBirthday`
- Ejemplo de uso; `http://localhost:3000/api/rindegastos/getDaysUntilMyBirthday?birthdate=15-11-1988`
- La variable de entrada `birthdate` debe tener formato `AA-MM-AAAA`.
 
## Requerimiento 3
- El nombre del endpoint es `api/rindegastos/getTheNumber`
- Ejemplo de uso; `http://localhost:3000/api/rindegastos/getTheNumber?first=9&second=34`
- Las variables de entrada `first` y `second` deben ser numericas mayor a cero. 
# ExamenAlMundo
Api Rest Node Js v 8.11.3 + Angular 6

# Para la levantar la api

Ingresar al directorio api.

Ejecutar los siguientes comandos:

npm install

## Para desarrollo

NODE_ENV=dev node index.js

Si la api rest levanta en desarrollo, lo hace en el puerto 8080: http://localhost:8080/hoteles


## Para produccion

NODE_ENV=prod node index.js

Si la api rest levanta en produccion, lo hace en el puerto 8081: http://localhost:8081/hoteles

Para filtros, se debe enviar como parametro los filtos (name, stars)

Por ejemplo: http://localhost:8080/hoteles?name=xxx&stars=[xxx]


# Para levantar la web

Ingresar al directorio almundo.

Ejecutar los siguientes comandos:

1 - npm install

2 - ng serve --open

Con este ultimo comando, se ejecutara la pagina web en la url http://localhost:4200/

## Para generar paquete productivo

Ejecutar el comando.

1 - ng build --prod (el puerto de la api, esta configurado en la carpeta environments por ambientes)

Esto genera la carpeta dist/



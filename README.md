# Pueba Tecnica - Prestamype

Este es un proyecto de tipo de cambio desarrollado con:
 * Node.js 
 * Express
 * con Docker como entorno de desarrollo. 

Proporciona una API REST para crear usuarios, autenticación, Soliticitudes de cambio de divisa.

## Instrucciones de Uso

### Levantar el Proyecto con Docker

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/cristianA123/Pt-Tipo-de-cambio-prestamype.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd Pt-Tipo-de-cambio-prestamype
    ```

3. crear un archivo `.env` y pega los datos de `.example.env`:

4. Levanta el contenedor Docker:

    ```bash
     docker-compose up --build -d
    ```

### Acceder a la API

#### Autenticación

Para iniciar sesión y obtener un token de autenticación, realiza una solicitud POST a la siguiente URL:

- **URL de Inicio de Sesión**: http://localhost:4000/api/auth/login
- **POST**
```
{
    "password": "123456",
    "email": "cristian@gmail.com"
}
```

#### Crear usuario

Para iniciar sesión y obtener un token de autenticación, realiza una solicitud POST a la siguiente URL:

- **URL**: http://localhost:4000/api/users
- **Body**
- **POST**
```
{
    "password": "123456",
    "email": "cristian7@gmail.com"
}
```

#### Enviar token:
![Bearer Token {{token}}](https://cdn.discordapp.com/attachments/783095481227935744/1204857862682185768/image.png?ex=65d64253&is=65c3cd53&hm=8aba6ea742bf2d7c6fb71fb4b52f435c683c02779e43ff7ae12300f555d935d5&)

#### Crear Solicitud

Para crear Solicitud, realiza una solicitud POST a la siguiente URL:

- **URL**: http://localhost:4000/api/exchange
- **Body**
- **POST**
```
{
    "tipo_de_cambio": "venta",
    "monto_enviar": 88
}
```
#### Listar mis Solicitudes

Para listar mis Solicitudes, realiza una solicitud GET a la siguiente URL:

- **URL**: http://localhost:4000/api/exchange
- **GET**

#### Detalle de mis Solicitudes

Para ver el detalle de mis Solicitudes, realiza una solicitud GET a la siguiente URL:

- **URL**: http://localhost:4000/api/exchange/:id
- **GET**

#### Eliminar  Solicitud

Para eliminar  Solicitud, realiza una solicitud Delete a la siguiente URL:

- **URL**: http://localhost:4000/api/exchange/:id
- **Delete**
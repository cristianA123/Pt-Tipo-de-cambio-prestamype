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

3. Construye la imagen de Docker:

    ```bash
    docker build -t nombre-de-tu-proyecto .
    ```

4. Levanta el contenedor Docker:

    ```bash
    docker run -d -p 4000:4000 nombre-de-tu-proyecto
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
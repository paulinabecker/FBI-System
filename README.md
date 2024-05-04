# FBI-System

Descripción
El FBI está abriendo un departamento de informática y te ha contratado para crear el sistema
online que gestione misiones secretas, necesitarás programar un servidor con Express que
utilice JWT para la autorización de agentes que visiten las páginas restringidas.

Requerimientos
1. Crear una ruta que autentique a un agente basado en sus credenciales y genere un
token con sus datos. 

2. Al autenticar un agente, devolver un HTML que:
a. Muestre el email del agente autorizado.
b. Guarde un token en SessionStorage con un tiempo de expiración de 2 minutos.
c. Disponibiliza un hiperenlace para redirigir al agente a una ruta restringida. 

3. Crear una ruta restringida que devuelva un mensaje de Bienvenida con el correo del
agente autorizado, en caso contrario devolver un estado HTTP que indique que el
usuario no está autorizado y un mensaje que menciona la descripción del error.


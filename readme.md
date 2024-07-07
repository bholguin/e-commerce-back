npx prisma migrate dev => crea la base de datos con respecto a la configuracion de los modelos en prisma 
# e-commerce-back

Aplicación Backend node para aplicar como Front End developer en LinkTIC

## Developing

una vez clonado el proyecto e instaladas las dependencias usando `npm install` (o `pnpm install` o `yarn`), iniciar el servidor de desarrollo de la siguiente manera:

debes copiar el contenido del archivo `.env-example` a `.env`. 

migrar la base de datos
```bash
npx prisma migrate dev
```
correr el proyecto: 
```bash
npm run build

npm run start
```

## Create User

para crear un usuario e interactuar en la aplicacion debes ingresar a `http://localhost:3000/api-docs` y usar el endpoint post `/api/user` 


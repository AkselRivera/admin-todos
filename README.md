# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Correr un `npm install` para recuperar los modulos de node
5. Correr un `npm run dev` para levantar nuestro ambiente
6. Correr los siguientes comandos de prisma

```
npx prisma migrate dev
npx prisma generate

```

7. Ejecutar el SEED para [crear la base de datos](http://localhost:3000/api/seed)

- Opcional:
  Para actualizar dependencias

```
npm i -g npm-check-updates

ncu

ncu --upgrade
```

# Prisma commands

```
npx primsa init
npx prisma migrate dev
npx prisma generate

```

# Production

Run with docker
---
If you have docker installed on your local machine you can start the backend environement by running the following command
```
docker compose up
```

Or to run locally
---
Install dependency
```
npm i
```

Run migration and seed database
```
npx sequelize-cli db:migrate
```

```
npx sequelize-cli db:seed:all
```

run on local
```
npm run dev
```

for production
```
npm start
```

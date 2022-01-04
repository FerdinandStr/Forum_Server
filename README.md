# Forum_Server
DHBW Forum Server (Express)

## Scripts
npm run start

### Knex Migration script => DB Setup
npx knex migrate:latest --knexfile .\src\config\knex\knexfile.js --env postgresql  
npx knex migrate:latest --knexfile .\src\config\knex\knexfile.js --env sqlite

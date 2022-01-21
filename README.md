# Forum_Server

DHBW Forum Server (Express)

## Scripts

npm run start

## Knex Migration scripts => DB Setup

//npx knex --knexfile .\src\config\knex\knexfile.js --env postgresql
//npx knex --knexfile .\src\config\knex\knexfile.js --env postgresql migrate:make create_benutzer_table
//npx knex --knexfile .\src\config\knex\knexfile.js --env postgresql migrate:latest
//npx knex --knexfile .\src\config\knex\knexfile.js --env postgresql seed:make 00_forum_data
//npx knex --knexfile .\src\config\knex\knexfile.js --env postgresql seed:run

### INFO cheatsheet

https://devhints.io/knex

### Info knex migration

https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261

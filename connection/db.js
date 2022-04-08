const {Pool} =require('pg');


const dbPool = new Pool  ({
    database: 'personal-project',
    port: 5432,
    user: 'postgres',
    password: 'fisabilan'
})

module.exports = dbPool;
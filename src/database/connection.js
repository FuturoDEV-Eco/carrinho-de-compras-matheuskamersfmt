import pkg from 'pg';
const { Pool } = pkg;

export const connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'labcommerce',
    port: 5432
});

export default connection;
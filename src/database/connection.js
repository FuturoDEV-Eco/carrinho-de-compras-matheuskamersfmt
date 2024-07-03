import { Pool } from 'pg';

export const connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'labcommerce',
    port: 5432
});
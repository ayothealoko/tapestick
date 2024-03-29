import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function getClient<T>(query: (cient: pg.PoolClient) => T) {
  const client = await pool.connect();
  const data = await query(client);
  client.release();
  return data;
}

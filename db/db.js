const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function authenticateUser(id, password) {
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM public.user WHERE name = $1 AND password = $2';
    const values = [id, password];
    const result = await client.query(query, values);
    client.release();

    return result.rowCount > 0;
  } catch (err) {
    console.error('db.js エラー', err);
    throw err;
  }
}

module.exports = {
  authenticateUser
};


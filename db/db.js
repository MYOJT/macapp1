const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function authenticateUser(name, password) {
    const result = await pool.query('SELECT * FROM public.users WHERE name = $1 AND password = $2', [name, password]);
    return result.rowCount > 0;
}

async function registerNewTodo(user_id, todo, start_time, deadline_time) {
    const query = `
        INSERT INTO todos (user_id, todo, is_finish, start_time, deadline_time, create_time)
        VALUES ($1, $2, false, $3, $4, current_timestamp)
        RETURNING todo_id;
    `;
    const values = [user_id, todo, start_time, deadline_time];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function selectLoginUser(name, password) {
  const result = await pool.query('SELECT user_id FROM public.users WHERE name = $1 AND password = $2', [name, password]);
  if (result.rows.length > 0) {
    return result.rows[0].user_id;  // 最初の行の user_id を返す
  }
}

const updateTodoStatusWithTime = async (todoValue, is_finish) => {
  const currentTime = new Date().toISOString();
  await pool.query('UPDATE todos SET is_finish = $1, update_time = $2 WHERE todo = $3', [is_finish, currentTime, todoValue]);
};

const setTodoDeleteTime = async (todoValue) => {
  const currentTime = new Date().toISOString();
  await pool.query('UPDATE todos SET delete_time = $1 WHERE todo = $2', [currentTime, todoValue]);
};

module.exports = {
  authenticateUser,
  registerNewTodo,
  selectLoginUser,
  updateTodoStatusWithTime,
  setTodoDeleteTime
};


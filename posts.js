const { Pool } = require('pg');

const credenciales = {
  host: 'localhost',
  user: 'postgres',
  password: 'cg9053',
  database: 'likeme',
  allowExitOnIdle: true  
};

const pool = new Pool(credenciales)

const obtenerPosts = async() => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows)
  return rows;
};

const crearPost = async (titulo, img, descripcion) => {
  const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3)";
  const valores = [titulo, img, descripcion];
  const result = await pool.query(consulta, valores);
};

const modificarPosts = async (id) => {
  const consulta = 'UPDATE posts SET likes = (case when likes IS NULL then 1 else likes + 1 end) WHERE id = $1;';
  const valores = [id];
  const result = await pool.query(consulta, valores);
  return result;
 };

 const eliminarPost = async(id) => {
  const consulta = 'DELETE FROM posts WHERE id = $1';
  const valores = [id];
  const result = await pool.query(consulta, valores);
};

 
module.exports = { obtenerPosts, crearPost, modificarPosts, eliminarPost };
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
 
module.exports = { obtenerPosts, crearPost };
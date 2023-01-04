const express =  require('express');
const app = express();
const PORT = 3000;
const cors = require("cors");

const { obtenerPosts, crearPost } = require('./posts');

app.use(express.json())
app.use(express.static("public"))
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});


app.get("/posts", async (req, res) => {
    const posts = await obtenerPosts();
    res.json(posts);
});

app.post("/posts", async (req, res) => {
    const { titulo, url, descripcion } = req.body;
    await crearPost(titulo, url, descripcion);
    res.send("Post creado");

});

app.listen(PORT, () => {
  console.log(`Servidor encendido ${PORT}`);
});
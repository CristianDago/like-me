const express =  require('express');
const app = express();
const PORT = 3000;
const cors = require("cors");

const { obtenerPosts, crearPost, modificarPosts, eliminarPost } = require('./posts');

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
    try {
        const { titulo, url, descripcion } = req.body;
        await crearPost(titulo, url, descripcion);
        res.send("Post creado");
    } catch (err) {
        throw err;
    }

});

app.put('/posts/like/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await modificarPosts(id);
        res.send("Actualización agregada con éxito");
    } catch (err) {
        throw err;
    }
});


app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarPost(id);
        res.send("Posts eliminado con éxito");
    } catch {
        throw err;
    }
});


app.listen(PORT, () => {
  console.log(`Servidor encendido ${PORT}`);
});
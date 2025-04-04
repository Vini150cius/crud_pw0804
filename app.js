const express = require("express");

const path = require("path");

const app = express();

const db = require("./models");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Configuração do EJS como view engine

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

// Rota principal

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

// Rotas para categorias e produtos

const categoriaRouter = require("./routes/categorias");
const professorRouter = require("./routes/professor");
const alunoRouter = require("./routes/aluno");
const integranteRouter = require("./routes/integrantes");

//const produtoRouter = require("./routes/produtos");

app.use("/categorias", categoriaRouter);
app.use("/professores", professorRouter);
app.use("/alunos", alunoRouter);
app.use("/integrantes", integranteRouter);

// Iniciar o servidor e sincronizar com o banco de dados

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
  });
});

module.exports = app;
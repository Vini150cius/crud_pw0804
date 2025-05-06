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
const cursoRouter = require("./routes/curso");
const integranteRouter = require("./routes/integrantes");
const produtoRouter = require("./routes/produtos");
const atribuicaoRouter = require("./routes/atribuicao");
const boletimRouter = require("./routes/boletim");

app.use("/categorias", categoriaRouter);
app.use("/professores", professorRouter);
app.use("/alunos", alunoRouter);
app.use("/cursos", cursoRouter);
app.use("/integrantes", integranteRouter);
app.use("/produtos", produtoRouter);
app.use("/atribuicoes", atribuicaoRouter);
app.use("/boletins", boletimRouter);

// Iniciar o servidor e sincronizar com o banco de dados

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
  });
});

module.exports = app;

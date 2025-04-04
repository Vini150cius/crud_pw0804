const express = require('express');
const router = express.Router();
const {Aluno} = require('../models');

router.get("/", async (req, res) => {
    const alunos = await Aluno.findAll();
    res.render(
        "base", {
        title: "Listar Alunos",
        view: "alunos/show",
        alunos,
        }
    );
});

router.get("/add", async (req, res) => {
  res.render(
    "base",
    {
      title: "Add Alunos",
      view: "alunos/add",
    }
  );
});

router.post("/add", async (req, res) => {
  await Aluno.create({
    ra: req.body.ra, 
    nome: req.body.nome, 
  });
  res.redirect("/alunos");
});

router.get("/edit/:id", async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id); 
  res.render(
    "base",
    {
      title: "edit Alunos",
      view: "alunos/edit",
      aluno,
    }
  );
});

router.post("/edit/:id", async (req, res) => {
  await Aluno.update(
    {
      ra: req.body.ra,
      nome: req.body.nome,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.redirect("/alunos");
});

router.post("/delete/:id", async(req, res) =>{
  await Aluno.destroy({where:{id: req.params.id}});
  res.redirect("/alunos")
});

module.exports = router;
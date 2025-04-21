const express = require('express');
const router = express.Router();
const { Atribuicao } = require('../models');

router.get("/", async (req, res) => {
    const atribuicoes = await Atribuicao.findAll();
    res.render(
        "base", {
            title: "Listar Categorias",
            view: "atribuicoes/show",
            atribuicoes,
    });
});

router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Atribuição",
            view: "atribuicoes/add",
    });
});

router.post("/add", async(req, res) =>{
    await Atribuicao.create({
        nome: req.body.nome,
        materia: req.body.materia,
        nota: req.body.nota
    });
    res.redirect("/atribuicoes")
});

router.get("/edit/:id", async (req, res) => {
    const atribuicao = await Atribuicao.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Atribuicao",
            view: "atribuicoes/edit",
            atribuicao,
    });
});

router.post("/edit/:id", async(req, res) =>{
    await Atribuicao.update(
        {
            nome: req.body.nome,
            materia: req.body.materia,
            nota: req.body.nota
        },
        {where:{id: req.params.id}}
    );
    res.redirect("/atribuicoes")
});

router.post("/delete/:id", async(req, res) =>{
    await Atribuicao.destroy({where:{id: req.params.id}});
    res.redirect("/atribuicoes")
});

module.exports = router;
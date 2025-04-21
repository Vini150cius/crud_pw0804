const express = require('express');
const router = express.Router();
const { Atribuicao } = require('../models');

router.get("/", async (req, res) => {
    const atribuicoes = await Atribuicao.findAll();
    res.render(
        "base", {
            title: "Listar Categorias",
            view: "atribuicoes/show",
            categorias,
    });
});

//add nova categoria - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Atribuição",
            view: "atribuicoes/add",
    });
});

//add nova categoria - no bd
router.post("/add", async(req, res) =>{
    await Atribuicao.create({
        nome: req.body.nome,
        materia: req.body.materia,
        nota: req.body.nota
    });
    res.redirect("/atribuicoes")
});

//edit categoria - formulário
router.get("/edit/:id", async (req, res) => {
    const atribuicao = await Atribuicao.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Atribuicao",
            view: "atribuicoes/edit",
            categoria,
    });
});

//edit categoria - no bd
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

//excluir categoria
router.post("/delete/:id", async(req, res) =>{
    await Atribuicao.destroy({where:{id: req.params.id}});
    res.redirect("/atribuicoes")
});

module.exports = router;
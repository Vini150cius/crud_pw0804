const express = require("express");
const router = express.Router();
const { Boletim, Atribuicao } = require("../models"); 

router.get("/", async (req, res) => {
  try {
    const boletins = await Boletim.findAll({
      include: [{ model: Atribuicao, as: "atribuicao", attributes: ['id', 'nome', 'materia', 'nota'] }],
    }); 

    res.render("base", {
      title: "Boletins",
      view: "boletins/show",
      boletins,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar boletins");
  }
});

router.get("/add", async (req, res) => {
  try {
    const atribuicoes = await Atribuicao.findAll();
    res.render("base", {
      title: "Add Boletim",
      view: "boletins/add",
      atribuicoes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar atribuicoes");
  }
});

router.post("/add", async (req, res) => {
  try {
    const { nota, bimestre, atribuicaoId } = req.body;
    await Boletim.create({
      nota,
      bimestre,
      atribuicao_id: atribuicaoId
    });
    res.redirect("/boletins");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar boletim");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const boletim = await Boletim.findByPk(id, {
      include: [{ model: Atribuicao, as: "atribuicao" }],
    });
    const atribuicoes = await Atribuicao.findAll();
    if (boletim) {
      res.render("base", {
        title: "Edit Boletim",
        view: "boletins/edit",
        boletim,
        atribuicoes,
      });
    } else {
      res.status(404).send("Boletim não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar boletim");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, bimestre, atribuicaoId } = req.body;
    const boletim = await Boletim.findByPk(id);
    if (boletim) {
      await boletim.update({ nota, bimestre, atribuicao_id: atribuicaoId });
      res.redirect("/boletins");
    } else {
      res.status(404).send("Boletim não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o boletim");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const boletim = await Boletim.findByPk(id);
    if (boletim) {
      await boletim.destroy();
      res.redirect("/boletins");
    } else {
      res.status(404).send("Boletim não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir boletim");
  }
});

module.exports = router;
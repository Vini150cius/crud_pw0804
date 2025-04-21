const express = require("express");
const router = express.Router();
const { Boletim, Atribuicao } = require("../models"); // Ajuste o caminho conforme necessário

// Mostrar todos os produtos
router.get("/", async (req, res) => {
  try {
    const boletins = await Produto.findAll({
      include: [{ model: Atribuicao, as: "Atribuicao" }],
    }); 

    res.render("base", {
      title: "Boletins",
      view: "boletins/show",
      produtos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar produtos");
  }
});

// Formulário para adicionar um novo produto
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

// Adicionar um novo produto
router.post("/add", async (req, res) => {
  try {
    const { nota, bimestre } = req.body;
    await Boletim.create({
      nota,
      bimestre
    });
    res.redirect("/boletins");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar boletim");
  }
});

// Formulário para editar um produto
router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const boletim = await Boletim.findByPk(id, {
      include: [{ model: Atribuicao, as: "Atribuicao" }],
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
    const { nota, bimestre } = req.body;
    const boletim = await Boletim.findByPk(id);
    if (boletim) {
      await boletim.update({ nota, bimestre });
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
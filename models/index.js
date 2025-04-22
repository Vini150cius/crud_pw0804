const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Categoria = require("./categoria")(sequelize, DataTypes);
db.Professor = require("./professor")(sequelize, DataTypes);
db.Aluno = require("./aluno")(sequelize, DataTypes);
db.Produto = require("./produto")(sequelize, DataTypes);
db.Curso = require("./curso")(sequelize, DataTypes); 
db.Boletim = require("./boletim")(sequelize, DataTypes);  
db.Atribuicao = require("./atribuicao")(sequelize, DataTypes);

//db.User = require("./user")(sequelize, DataTypes);

// Configurações de associações

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

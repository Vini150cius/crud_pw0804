module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define("Aluno", {
    ra: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Aluno;
};

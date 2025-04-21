module.exports=(sequelize, DataTypes) => {
    const Atribuicao = sequelize.define ("Atribuicao", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        materia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nota: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Atribuicao.associate = (models) => {
        Atribuicao.belongsTo(models.Boletim, {
            foreignKey: 'atribuicaoID',
            as: 'Boletim'
        })
    
    }

    return Atribuicao
}
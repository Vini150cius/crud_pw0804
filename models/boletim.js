module.exports = (sequelize, DataTypes) => {
    const Boletim = sequelize.define("Boletim", {
        nota: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bimestre: {
            type: DataTypes.INT,
            allowNull: false
         }
    })

    Boletim.associate = (models) => {
        Boletim.hasMany(models.Atribuicao, {
            foreignKey: 'atribuicaoID',
            as: 'atribuicao'
        })
    }
}
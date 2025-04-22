module.exports = (sequelize, DataTypes) => {
    const Boletim = sequelize.define("Boletim", {
        nota: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bimestre: {
            type: DataTypes.INTEGER, 
            allowNull: false
         }
    })

    Boletim.associate = (models) => {
        Boletim.belongsTo(models.Atribuicao, {  
            foreignKey: 'atribuicao_id',  
            as: 'atribuicao'
        })
    }

    return Boletim;  
}
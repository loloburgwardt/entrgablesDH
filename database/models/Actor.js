module.exports = (sequelize, dataTypes)=>{
    const alias = 'Actor'
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        rating: dataTypes.INTEGER
    }
    const config = {
        timestamps: true
    }

    const Actor = sequelize.define(alias, cols, config)
    return Actor
}
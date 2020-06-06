module.exports = (sequelize, dataTypes) => {
    const alias = 'Movie'
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        title: dataTypes.STRING,
        length: dataTypes.INTEGER,
        awards: dataTypes.INTEGER,
        release_date: dataTypes.DATEONLY,
        rating: dataTypes.INTEGER

    }
    const config ={
        timestamps: true
    }

    const Movie = sequelize.define(alias, cols, config)


    return Movie
}
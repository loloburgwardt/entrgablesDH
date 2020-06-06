const db = require('../database/models/index.js');
const sequelize = db.sequelize
const Op = db.Sequelize.Op
const controller = {
    index: (req, res) => {
        sequelize.query('SELECT * FROM actors')
            .then(rta => {
                let actorsAll = rta[0]
                return res.render('actors/actors', { actorsAll })
            })
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id)
            .then(rta => {
                return res.render('actors/detail', { actor: rta })
            })
    },
    delete: (req, res) => {
        db.Actor.destroy({
            where: {
                id: req.params.id
            }
        }).then(respuesta => {
            return res.redirect('/actors')
        }).catch(error => {
            return res.send('Ale y Gonza, me tira este error de que no se puede eliminar el registro ya que tiene una foreign key. Nose como solucionarlo. Aca se los dejo:\n\n' + error)
        })
    },
    edit: (req, res) => {
        db.Actor.findByPk(req.params.id)
            .then(rta => {
                return res.render('actors/edit', { actor: rta })
            })
    },
    processEdit: (req, res) => {
        db.Actor.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(respuesta => {
            return res.redirect('/actors/detail/' + req.params.id)
        }).catch(error => {
            return res.send("No se pudo procesar el pedido")
        })

    },
    recommended: (req, res) => {
        db.Actor.findAll({
            where: {
                rating: {
                    [Op.gt]: 8
                }
            },
            order: [['rating', 'DESC']]
        }).then(actors => {
            return res.render('actors/recommended', { actors })
        })
    },
    search: (req, res) => {
        return res.render('actors/search')
    },
    processSearch: (req, res) => {
        db.Actor.findAll({
            where: {
                [Op.or]:[
                    {
                        first_name: {
                            [Op.like]: '%' + req.body.search + '%'
                        }
                    },
                    {
                        last_name: {
                            [Op.like]: '%' + req.body.search + '%'
                        }
                    }
                ]
            },
            order:[
                ['first_name', 'ASC'],
                ['last_name', 'ASC']
            ]
        }).then(actors => {
            return res.render('actors/search', { actors })
        })
    }
}
module.exports = controller;
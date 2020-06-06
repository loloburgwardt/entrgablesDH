const db = require('../database/models/index.js');
const sequelize = db.sequelize
const Op = db.Sequelize.Op
const controller = {
    index: (req,res)=>{
        sequelize.query('SELECT * FROM movies')
            .then(rta => {
                let moviesAll = rta[0]
                return res.render('movies/movies',{moviesAll})
            })
    },
    detail: (req,res)=>{
        db.Movie.findByPk(req.params.id)
            .then(rta=>{
                return res.render('movies/detail', {movie:rta})
            })
    },
    delete: (req,res)=>{
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        }).then(respuesta=>{
            return res.redirect('/movies')
        }).catch(error=>{
            return res.send('Ale y Gonza, me tira este error de que no se puede eliminar el registro ya que tiene una foreign key. Nose como solucionarlo. Aca se los dejo:\n\n'+error)
        })
    },
    edit: (req,res) =>{
        db.Movie.findByPk(req.params.id)
            .then(rta => {
                return res.render('movies/edit', { movie: rta })
            })
    },
    processEdit:(req,res)=>{
        db.Movie.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                length: req.body.length
            },
            {where:{
                id: req.params.id
            }}
        ).then(respuesta =>{
           return res.redirect('/movies/detail/'+req.params.id) 
        }).catch(error=>{
            return res.send("No se pudo procesar el pedido")
        })
        
    },
    new: (req,res)=>{
        db.Movie.findAll({
            limit: 5,
            order:[['release_date','DESC']]
        }).then(respuesta=>{
            return res.render('movies/new', {movies:respuesta})
        })
    },
    recommended: (req,res)=>{
        db.Movie.findAll({
            where: {
                rating: {
                    [Op.gt]:8
                }
            },
            order:[['rating','DESC']]
        }).then(movies => {
            return res.render('movies/recommended', {movies})
        })
    },
    search: (req,res)=> {
        return res.render('movies/search')
    },
    processSearch: (req, res)=>{
        db.Movie.findAll({
            where: {
                title:{
                    [Op.like]: '%'+ req.body.search +'%'
                }
            }
        }).then(movies=>{
            return res.render('movies/search', {movies})
        })
    }
}
module.exports = controller;

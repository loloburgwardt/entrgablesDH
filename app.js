const express = require('express');
const app = express();
const moviesRouter = require('./routes/movies');
const methodOverride = require('method-override')
const actorsRouter = require('./routes/actors')

//Settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, ()=>{
    console.log("Running Server 3000")
})

app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter)
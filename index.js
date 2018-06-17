const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const port = 3130;

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//MongoDB and Mongoose Connections
mongoose.connect('mongodb://localhost/vidjot-dev')
.then(() => console.log('MongoDB Connected....'))
.catch(err => console.log(err));

//Load Idea Model
require('./models/Ideas');
const Idea = mongoose.model('ideas');


//HandleBars Middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')
//Middleware
app.use(function(request, response, next)	{
	console.log(Date.now());
	next();
});

//Body Parser - Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Index Route
app.get('/', (request, response) => {
	const title  = 'Welcome Page';
	response.render('index', {
		title: title
	});
});

//About Route
app.get('/about', (request, response) => {
	const title  = 'Hello Page';
	response.render('about', {
		title: title
	});
});

//Add Ideas Form
app.get("/ideas/add", (request, response) => {
	response.render('ideas/add');
});

//Process Form
app.post("/ideas", (request, response) => 	{
	console.log(request.body);
	let errors = [];
	if (!request.body.title)	{
		errors.push({text: "Title add madhi."});
	}
	if (!request.body.details)	{
		errors.push({text: "Details push madhi."});
	}

	console.log("Errors = " + errors.length);
	if (errors.length > 0)	{
		response.render('ideas/add', {
			error: errors,
			title: request.body.title,
			details: request.body.details
		});
	}	else	{
		const newUser = {
			title: request.body.title,
			details: request.body.details
		};
		new Idea(newUser)
		.save()
		.then(idea => {
			response.redirect('/ideas');
		});
	}
});

//Ideas index page
app.get('/ideas', (request, response) => {
	Idea.find({})
	.sort({date: 'desc'})
	.then(ideas => {
			response.render('ideas/index', {
				ideas: ideas
			});
		});
})
app.listen(port, () => {
	console.log(`Server started, port = ${port}`);
});
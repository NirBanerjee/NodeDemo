const express = require('express');
const app = express();
const port = 3130
const exphbs = require('express-handlebars');

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
	response.render('hello', {
		title: title
	});
})

app.listen(port, () => {
	console.log(`Server started, port = ${port}`);
});
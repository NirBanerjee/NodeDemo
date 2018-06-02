const express = require('express');
const app = express();
const port = 3130

//Middleware
app.use(function(request, response, next)	{
	console.log(Date.now());
	next();
});
//Index Route
app.get('/', (request, response) => {
	response.send("Index")
});

//About Route
app.get('/about', (request, response) => {
	response.send("About Hello ")
})

app.listen(port, () => {
	console.log(`Server started, port = ${port}`);
});
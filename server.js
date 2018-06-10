const express = require('express');
const hbs = require('hbs');
const fs = require('fs');  

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials")   //for the partial hbs files

hbs.registerHelper('getCurrentYear', function(){      //helper function used in hbs {{getCurrentYear}} templating
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', function(text){
	return text.toUpperCase();
})


app.set('view engine', 'hbs');
 

app.use(function(req, res, next){
	var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log', log + '\n')
	next();

})

/*app.use(function(req, res, next){
  res.render("maintenance.hbs");
})
*/

app.use(express.static(__dirname + '/public'));    //middleware


app.get('/', function(req, res){
	//res.send("<h2>hello!</h2>");
	//res.send({name: "Babbu", likes:['basketball', 'pie']})
	res.render("home.hbs", {
		pageTitle: "Home page",
		welcomeMessage: "This is my site"
	})
});

app.get('/about', function(req,res){
	//res.send("about page")
	res.render('about.hbs',{
		pageTitle: "About page"
	});
});

app.get('/bad', function(req, res){
	res.send({error:"not found!"})
})


app.listen(port, function(){
	console.log("Server is up on port " + port)
});
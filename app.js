var path = require('path');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var scribe = require('scribe-js')();
var mustacheExpress = require('mustache-express');
var flash = require('express-flash');
var router = express.Router();
var userController = require(path.join(__dirname, './controller', 'user'));

var expressValidator = require('express-validator');
app.set('view engine', 'html');
app.engine('html', mustacheExpress());
app.set('views', __dirname + '/view');
app.use(session({
	secret: '1234567890QWERTY',
	saveUninitialized: true,
	resave: true
}));
app.use(expressValidator());

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());

app.use(express.static(path.join(__dirname, './static')));
app.use('/static', express.static(path.join(__dirname, './static')));

app.get('/signup', userController.getSignup);
app.post('/signup',userController.postSignup);
app.get('/login', userController.getLogin);
app.post('/login',userController.postLogin);
app.get('/logout',function(req,res){
    req.session.user = null;
    res.redirect('/');
});
app.get('/', userController.mainpage);
app.post('/enroll_pingpong', userController.enroll_pingpong);
function sendStaticFile(url) {
	return function(req, res) {
		res.render(url, {  });
	};
}

app.listen(9000, function() {
	console.log('app listening on port 9000!');
});
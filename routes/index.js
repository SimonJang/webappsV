var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var Land = mongoose.model('Land');
var Quiz = mongoose.model('Quiz');
var User = mongoose.model('User');

// REST routes worden hier gedefinieerd

// Uitleg REST service
router.get('/api', function(req, res) {
  res.json(({'Gebruik': 'Testen van REST routes'}))
});

// GET - landen (allemaal)
router.get('/api/landen', function(req, res, next) {
  Land.find(function(err,landen) {
    if(err) {
      return next(err);
    }
    console.log('Landen worden opgevraagd');
    res.json(landen);
  })
});

// GET - landen (specifiek)
router.get('/api/landen/:land', function(req,res) {
  res.json(req.land);
});

// POST - land
router.post('/api/landen', function(req,res,next) {
  var land = new Land(req.body);
  land.save(function(err,land) {
    if(err) {
      return next(err);
    }
    res.json(land);
  })
});

router.get('/api/quiz', function(req,res,next) {
  Quiz.find(function(err,quizs) {
    if(err) {
      return next(err)
    }
    console.log('Quizes worden opgevraagd');
    res.json(quizs)
  })
});

router.post('/api/quiz', function(req,res, next) {
  var quiz = new Quiz(req.body);
  quiz.save(function(err,quiz) {
    if(err) {
      return next(err);
    }
    res.json(quiz);
  })
});


// User: nieuwe user (POST)

router.post('/register', function(req,res,next) {
  if(!req.body.username || req.body.password) {
    return res.status(400).json({message:'Gelieve alle velden in te vullen'});
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if(err) {return next(err);}
    return res.json({token: user.generateJWT()});
  })

});

// User: bestaande user (login - POST)

router.post('/login', function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Gelieve alle velden in te vullen'});
  }

  passport.authenticate('local', function(err,user,info) {
    if(err) { return next(err)}

    if(user) {
      return res.json({token: user.generateJWT()});
    }
    else {
      return res.status(401).json(info);
    }
  })(req,res,next)
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Configureren van Router POSTing

router.param('post', function(req,res,next,id) {
  var query = Land.findById(id);

  query.exec(function(err,land) {
    if(err) {return next(err);}
    if(!land) {return next(new Error('Geen land gevonden'))}

    req.land = land;
    return next();
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var Land = mongoose.model('Land');
var Quiz = mongoose.model('Quiz');
var User = mongoose.model('User');

// Middleware voor auth
// Zodat de requests kunnen worden gecontroleerd

var auth = jwt({secret: 'SECRET', userProperty:'payload'});

// REST routes worden hier gedefinieerd

// Uitleg REST service
router.get('/api', function(req, res) {
  res.json(({'Gebruik': 'Testen van REST routes'}))
});

// GET - landen (allemaal)
router.get('/api/landen', function(req, res, next) {
  Land.find({}).sort({land: 1}).exec(function(err,landen) {
    if(err) {
      return next(err);
    }
    console.log('Landen worden opgevraagd');
    var rlanden = landen
    console.log('Landen worden gesorteerd');
    res.json(rlanden);
  })
});

// POST - land
// Wordt momenteel niet gebruikt
router.post('/api/landen', function(req,res,next) {
  var land = new Land(req.body);
  land.save(function(err,land) {
    if(err) {
      return next(err);
    }
    res.json(land);
  })
});

// GET - reeks (een willekeurige reeks van hoofdsteden)

router.get('/api/reeks/:id' , function(req,res) {
  var landen = {};
  landen = Land.find({},function(err,landen) {
    if(err) {
      return next(err);
    }

    var limiter = req.params.id;
    var responseArray = [];
    var options = [];

    while(responseArray.length < limiter) {
      var randomCountry = Math.floor((Math.random() * landen.length));
      responseArray.push(landen[randomCountry]);
      landen.splice(randomCountry, 1);

      while (options.length < 2) {
        responseArray[responseArray.length - 1].options = {}
        var randomCapitals = Math.floor((Math.random() * landen.length));
        if(options.indexOf(landen[randomCapitals].hoofdstad) == -1) {
          options.push(landen[randomCapitals].hoofdstad);
        }
      }
      responseArray[responseArray.length - 1].options = options;
      options = [];
    }
    res.json(responseArray);
  });

});

// GET alle quizes - quiz

router.get('/api/quiz/', function(req,res,next) {
  Quiz.find({}, null,{sort:{'id': 1}} ,function(err,quizs) {
    if(err) {
      console.log(err)
      return next(err)
    }
    console.log('Quizes worden opgevraagd');
    res.json(quizs)
  })
});

// POST custom quiz // TODO nice to have

router.post('/api/quiz', function(req,res, next) {
  var quiz = new Quiz(req.body);
  quiz.save(function(err,quiz) {
    if(err) {
      return next(err);
    }
    res.json(quiz);
  })
});

// GET - specifieke quiz

router.get('/api/quiz/:id', function(req,res) {
  var searchID = req.id;
  Quiz.findOne({'id': searchID}, function(err, quiz) {
    if(err) {console.log(err)};
    res.json(quiz)
  })
});


// User: nieuwe user (POST)

router.post('/api/registreer', function(req,res,next) {
  if(!req.body.username || !req.body.password) {
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

router.post('/api/names/', function(req,res,next) {
  var sugnaam = req.body.naam;
  User.findOne({username: sugnaam}, function(err, result) {
    if(err) {
      console.log("Er is iets verkeerd gegaan bij het opvragen van namen")
      return next(err);
    }
    if(!result) {
      return res.json({response: 'ok'})
    }
    if(result) {
      return res.json({response: 'nok'})
    }
  })
});

router.get('/api/names/', function(req,res) {
  User.find({}, {username: 1, _id: 0}, function(err, names) {
    if(err) {
      console/log(err)
    }
    console.log("Namen worden opgevraagd");
    res.json(names);
  })
});

// User: bestaande user (login - POST)

router.post('/api/login', function(req, res, next) {
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
});

router.post('/api/score/reeks', auth, function(req,res,next) {
  var user = req.payload.username;
  var extra = req.body.score;
  User.update({username: user}, {$inc: { aantalGespeeldR: 1, score: extra}}, function(err, user) {
    if(err){
      console.log(err);
      return next(err);
    }
    res.json({status: "ok"});
  });
});

router.post('/api/score/quiz', auth, function(req,res,next) {
  var user = req.payload.username;
  var extra = req.body.score;
  User.update({username: user}, {$inc: { aantalGespeeldQ: 1, score: extra}}, function(err, user) {
    if(err){
      console.log(err);
      return next(err);
    }
    res.json({status: "ok"});
  });
});

router.post('/api/user/',auth, function(req,res,next) {
  var user = req.payload.username;
  User.findOne({'username': user}, {score: 1, aantalGespeeldQ: 1, aantalGespeeldR: 1}, function(err, user) {
    if(err) {
      console.log(err);
      return next(err)
    }
    console.log('Gebruikers info wordt opgevraagd');
    res.json(user)
  })
});

router.post('/api/highscore/', auth, function(req,res,next) {
  User.find({}, {username : 1, score: 1})
      .sort({score: 1})
      .limit(10)
      .exec(function(err, scores) {
        if(err) {
          console.log(err);
          return next(err);
        }
        console.log('Highscore wordt opgevraagd');
        res.json(scores)
  })
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

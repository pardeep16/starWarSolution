var express = require('express');
var router = express.Router();

var serachCharController=require('.././controllers/searchCharacter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/character/:name',serachCharController.searchCharacter);

router.get('/characters',serachCharController.getCharacters);

router.get('/planetresidents',serachCharController.getResidents);

module.exports = router;

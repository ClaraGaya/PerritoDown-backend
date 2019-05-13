const { db } = require('../db.config');

const getAsanas = (req, res) => {
  db.query('SELECT * from Asanas')
    .then( (data) => {
      res.status(200).json({asanas: data});
    })
    .catch(function (err) {
      console.log(err);
    });
}

const getAsanaByType = (req, res) => {
  const query = req.params.query.toLowerCase();
  db.query('SELECT * from Asanas WHERE Type=$1', [query])
  .then( (data) => {
    res.status(200).json({asanas: data, query: query});
  })
  .catch(function (err) {
    console.log(err);
  });
}

const getAsanaByQuery = (req, res) => {
    const query = req.params.query.toLowerCase();
    db.query('SELECT * from Asanas WHERE LOWER(Name) LIKE $1 OR LOWER(Sanskrit) LIKE $1 OR LOWER(English) LIKE $1 OR LOWER(Type) LIKE $1', ['%' + query + '%'])
    .then( (data) => {
      res.status(200).json({asanas: data, query: query});
    })
    .catch(function (err) {
      console.log(err);
    });
}

const getTypes = (req, res) => {
  db.query('SELECT DISTINCT Type from Asanas')
    .then( (data) => {
      res.status(200).json({types: data});
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = {getAsanas,getAsanaByType,getAsanaByQuery, getTypes};
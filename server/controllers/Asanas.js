const { db, pgp } = require('../db.config');

const getAsanas = (req, res) => {
  db.query('SELECT * from Asanas')
    .then( (data) => {
      return res.status(200).json({asanas: data});
    })
    .catch(function (err) {
      console.log(err);
    });
    
}

const getAsanaById = (req, res) => {
  db.query(`SELECT * from Asanas WHERE id=${req.params.id}`)
  .then( (data) => {
    return res.status(200).json({data: data[0]});
  })
  .catch(function (err) {
    console.log(err);
  });
}

const getAsanaByType = (req, res) => {
  db.query(`SELECT * from Asanas WHERE Type=${req.params.query.toLowerCase()}`)
  .then( (data) => {
    return res.status(200).json({data: data});
  })
  .catch(function (err) {
    console.log(err);
  });
}

const getAsanaByQuery = (req, res) => {
    const query = req.params.query.toLowerCase();
    db.query('SELECT * from Asanas WHERE LOWER(Name) LIKE $1 OR LOWER(Sanskrit) LIKE $1 OR LOWER(English) LIKE $1 OR LOWER(Type) LIKE $1', ['%' + query + '%'])
    .then( (data) => {
      return res.status(200).json({data: data, query: query});
    })
    .catch(function (err) {
      console.log(err);
    });
}

const getTypes = (req, res) => {
  db.query('SELECT DISTINCT Type from Asanas')
    .then( (data) => {
      return res.status(200).json({data: data});
    })
    .catch(function (err) {
      console.log(err);
    });
}



module.exports = {getAsanas, getAsanaById, getAsanaByType, getAsanaByQuery, getTypes};
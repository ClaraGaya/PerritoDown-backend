const { db } = require('../db.config');

const getUsers = (req, res) => {
    db.query('SELECT * from Users')
    .then( (data) => {
      res.status(200).json({users: data});
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = {getUsers};
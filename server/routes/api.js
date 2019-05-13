const express = require('express');
const app = express();
const asanas = require('../controllers/Asanas');
const routines = require('../controllers/Routines');
const users = require('../controllers/Users');

app.get( '/', (req,resp) => {
    resp.status(200).send({status: 'OK'});
});

app.get('/asanas', asanas.getAsanas);
app.get('/asanas/:query', asanas.getAsanaByQuery);
app.get('/types', asanas.getTypes);
app.get('/types/:query', asanas.getAsanaByType);

app.get('/routines', routines.getRoutines);
app.get('/:user/routines', routines.getRoutinesByUser);
app.get('/:user/routines/:id', routines.getRoutineById);
app.post('/createroutine', routines.createRoutine);

app.get('/users', users.getUsers);

module.exports = app;


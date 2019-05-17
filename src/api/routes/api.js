const express = require('express');
const app = express();
const asanas = require('../controllers/Asanas');
const routines = require('../controllers/Routines');
const users = require('../controllers/Users');

app.get( '/', (req,resp) => {
    resp.status(200).send({status: 'OK'});
});

// @TODO add auth middleware
// @TODO add registration page
// @TODO add logout route

app.get('/asanas', asanas.getAsanas);
app.get('/asanas/:id', asanas.getAsanaById);
app.get('/asanas/search/:query', asanas.getAsanaByQuery);
app.get('/types', asanas.getTypes);
app.get('/types/:query', asanas.getAsanaByType);

app.get('/routines', routines.getRoutines);
app.get('/:user/routines', routines.getRoutinesByUser);
app.get('/:user/routines/:id', routines.getRoutineById);

app.post('/routine', routines.addRoutine);

app.put('/routine/:id', routines.updateRoutine);

app.delete('/routine/:id', routines.deleteRoutine);

app.get('/users', users.getUsers);

module.exports = app;


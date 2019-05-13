const { db, pgp } = require('../db.config');

const getRoutines = (req, res) => {
    const query = "SELECT R.ID, R.name, R.description, R.UserId, array_to_string(array_agg(UserAsanas.AsanaId),',') AS Asanas" +
    " FROM Routines R" +
    " INNER JOIN UserAsanas ON R.ID=UserAsanas.RoutineID" +
    " GROUP BY R.ID ORDER BY R.ID;"
    db.query(query)
    .then( (data) => {
      res.status(200).json({routines: data});
    })
    .catch(function (err) {
      console.log(err);
    });
}

const getRoutinesByUser = (req, res) => {
    const userId = req.params.user;
    const query = "Select * from (SELECT R.ID, R.name, R.description, R.UserId, array_to_string(array_agg(UserAsanas.AsanaId),',') AS AsanasIds" +
    " FROM Routines R" +
    " INNER JOIN UserAsanas ON R.ID=UserAsanas.RoutineID" +
    " GROUP BY R.ID ORDER BY R.ID) Z where Z.UserId=" + userId;
    
    db.query(query)
    .then( (data) => {
        res.status(201).send({routines: data, userId: userId});
    })
    .catch(function (err) {
        console.log(err);
    });
}

const getRoutineById = (req, res) => {
    const routineId = req.params.id;
    const query = "Select * from (SELECT R.ID, R.name, R.description, R.UserId, array_to_string(array_agg(UserAsanas.AsanaId),',') AS AsanasIds" +
    " FROM Routines R" +
    " INNER JOIN UserAsanas ON R.ID=UserAsanas.RoutineID" +
    " GROUP BY R.ID ORDER BY R.ID) Z where Z.Id=" + routineId;
    
    db.query(query)
    .then( (data) => {
        res.status(201).send({routines: data, routineId: routineId});
    })
    .catch(function (err) {
        console.log(err);
    });
}

const createRoutine =  (req, res, next)  => {
    const { name, description, asanasArr } = req.body;
    const userId = 1; 
    db.task(t => {
        // execute a chain of queries against the task context, and return the result:
        return t.one('INSERT INTO Routines (Name, Description, UserID) VALUES ($1, $2, $3) RETURNING ID', [name, description, userId])
            .then(data => {
                const routineId = data.id;
                const arrObj = asanasArr.reduce( (acc,asanaID) => {
                    acc.push({
                        userid: userId,
                        asanaid: asanaID,
                        routineid: routineId, 
                    })
                    return acc;
                }, []);
                // generating a multi-row insert query inside a function. params:  data (arr or obj), columns (arr), table (string)
                const multi =  pgp.helpers.insert(arrObj, ['userid', 'asanaid', 'routineid'],  'userasanas' ) + ' RETURNING ID';
                return t.any(multi)
                .then(data => {
                    res.status(201).send(`${data.length} Asanas added to Routine ${routineId}`)
                })
                .catch(err => {
                    return next(err)   
                });
            });    
    })
    .catch(err => {
        return next(err)   
    });
};


const putRoutine = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, description, asanasArr } = request.body
  
    pool.query(
      'UPDATE Routines SET Name = $1, Description = $2 WHERE ID = $3',
      [name, description, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

module.exports = {getRoutines, getRoutineById, getRoutinesByUser, createRoutine, putRoutine};
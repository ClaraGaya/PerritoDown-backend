const { db, pgp } = require('../db.config');

const getRoutines = (req, res) => {
    const query = "SELECT R.ID, R.name, R.description, R.UserId, array_to_string(array_agg(UserAsanas.AsanaId),',') AS Asanas" +
    " FROM Routines R" +
    " LEFT JOIN UserAsanas ON R.ID=UserAsanas.RoutineID" +
    " GROUP BY R.ID ORDER BY R.ID;"
    db.query(query)
    .then( (data) => {
      res.status(200).json({data: data});
    })
    .catch(function (err) {
      console.log(err);
    });
}

const getRoutinesByUser = (req, res) => {
    const userId = req.params.user;
    const query = "Select * from (SELECT R.ID, R.name, R.description, R.UserId, array_to_string(array_agg(UserAsanas.AsanaId),',') AS Asanas" +
    " FROM Routines R" +
    " LEFT JOIN UserAsanas ON R.ID=UserAsanas.RoutineID" +
    " GROUP BY R.ID ORDER BY R.ID) Z where Z.UserId=" + userId;
    db.query(query)
    .then( (data) => {
        res.status(200).json({data: data});
    })
    .catch(function (err) {
        console.log(err);
    });
}

const getRoutineById = (req, res) => {
    const routineId = req.params.id;
    const query = "Select * from (SELECT R.ID, R.name, R.description, R.UserId, array_to_string(array_agg(UserAsanas.AsanaId),',') AS Asanas" +
    " FROM Routines R" +
    " LEFT JOIN UserAsanas ON R.ID=UserAsanas.RoutineID" +
    " GROUP BY R.ID ORDER BY R.ID) Z where Z.Id=" + routineId;
    db.query(query)
    .then( (data) => {
        res.status(200).json({ data: data[0] });
    })
    .catch(function (err) {
        console.log(err);
    });
}

const addRoutine =  (req, res, next)  => {
    const { name, description, asanasArr } = req.body;
    const userId = 1; 
    db.task(t => {
        // execute a chain of queries against the task context, and return the result:
        return t.one('INSERT INTO Routines (Name, Description, UserID) VALUES ($1, $2, $3) RETURNING *', [name, description, userId])
        .then(data => {
            const routine = data;
            const arrObj = asanasArr.reduce( (acc,asanaID) => {
                acc.push({
                    userid: userId,
                    asanaid: asanaID,
                    routineid: routine.id, 
                })
                return acc;
            }, []);
            // generating a multi-row insert query inside a function. params:  data (arr or obj), columns (arr), table (string)
            const multi =  pgp.helpers.insert(arrObj, ['userid', 'asanaid', 'routineid'],  'userasanas' ) + ' RETURNING ID';
            return t.map(multi, [], a => + a.id)
            .then(data => {
                res.status(201).json({
                    status: 'success',
                    message: 'Inserted new routine',
                    id: routine.id,
                    name: routine.name,
                    description: routine.description,
                    asanas: asanasArr,
                    asanasCount: data.length
                })
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

const updateRoutine =  (req, res, next)  => {
    db.task( t => {
        return t.batch([
            t.none('UPDATE Routines SET Name=$1, Description=$2 WHERE id=$3', [req.body.name, req.body.description, req.params.id] ),
            t.result('DELETE FROM userasanas WHERE routineid = $1', [req.params.id], b => b.rowCount)
        ])
    })
    .then( (data) => {
        const arrObj = req.body.asanasArr.reduce( (acc,asanaId) => {
            acc.push({
                userid: 1,
                asanaid: asanaId,
                routineid: req.params.id, 
            })
            return acc;
        }, []);
        // generating a multi-row insert query inside a function. params:  data (arr or obj), columns (arr), table (string)
        const multi =  pgp.helpers.insert(arrObj, ['userid', 'asanaid', 'routineid'],  'userasanas' ) + ' RETURNING ID';
        return db.any(multi)
        .then(data => {
            res.status(201).send(`${data.length} Asanas added to Routine ${req.params.id}`)
        })
        .catch(err => {
            return next(err)   
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

const deleteRoutine =  (req, res, next)  => {
    db.task( t => {
        return t.batch([
            db.result('DELETE FROM Routines WHERE ID = $1', [req.params.id], a => a.rowCount),
            db.result('DELETE FROM userasanas WHERE routineid = $1', [req.params.id], b => b.rowCount)
        ])
    })
    .then(data => {
        // res.status(200).send(`Routine deleted with ID: ${data[0]}, ${data[1]},`)
        if (data[0] === 0) {
            res.status(404)
            .json({
              status: 'success',
              message: `Removed 0 routines`,
              rowCount: 0
            });
          }
          else {
            res.status(200)
            .json({
              status: 'success',
              message: `Removed ${data[0]} routine`,
              id: Number(req.params.id),
              rowCount: data[0]
            });
          }
    }) .catch(err => {
        return next(err)   
    });
};



module.exports = {getRoutines, getRoutineById, getRoutinesByUser, addRoutine, updateRoutine, deleteRoutine};
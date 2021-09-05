const router = require ('express').Router ();
const Workout = require ('../models/workout.js');

//create new exercise
router.post ('/api/workouts', (req, res) => {
  Workout.create ({})//async createWorkout(data = {})
    .then (dbWorkout => {
      res.json (dbWorkout);
    })
    .catch (err => {
      res.status (400).json (err);
    });
});

//https://stackoverflow.com/questions/46255895/why-isnt-my-mongoose-findbyidandupdate-query-updating-in-the-database
router.put ('/api/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate (
    req.params.id,
    {$push: {exercises: req.body}}, //changed body.item to body
    {new: true, runValidators: true} // changed upsert to runValidators
  )
    .then (dbWorkout => {
      res.json (dbWorkout);
    })
    .catch (err => {
      res.json (err);
    });
});

//docs The following operation uses two $addFields stages to include three new fields in the output documents. For this just one is needed
router.get ('/api/workouts', (req, res) => {
  Workout.aggregate ([
    {
      $addFields: {
        totalDuration: {$sum: '$exercises.duration'},
      },
    },
  ])
    .then (dbWorkout => {
      res.json (dbWorkout);
    })
    .catch (err => {
      res.status (400).json (err);
    });
});
//Get getWorkoutsInRange fetch(`/api/workouts/range` -1 at index limit 7 workout._id
router.get ('/api/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 }) //17 mini
    .limit(7) //How to sort and limit the returned query results in mongoose
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

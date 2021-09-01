const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
//day: numeric
//new Date() returns the current date as a Date object.  
day: {
    type: Date,
    default: () => new Date(),
    },
/*  seeds fields (array of objects)
    type: 'resistance',
    name: 'Push Press',
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4, 
    distance*/    
exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: 'Select the exercise type',
      },
      name: {
        type: String,
        trim: true,
        required: 'Enter a name for the exercise',
      },
      duration: {
        type: Number,
        required: 'Enter the duration in minutes',
      },//conditional or optional
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
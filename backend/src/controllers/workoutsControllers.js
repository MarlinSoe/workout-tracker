import Workout from "../models/WorkOut.js";

export async function getAllWorkouts(req, res) {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts)
    } catch (error) {
        console.log('Error in getAllWorkouts controller', error);
        res.status(500).json({message:'Internal server failure.'});
    }
}

export async function getWorkoutById(req, res) {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({message:'Workout not found.'})
        res.status(200).json(workout);
        
    } catch (error) {
        console.log('Error in getAllWorkouts controller', error);
        res.status(500).json({message:'Internal server failure.'});
        
    }

}

export async function createWorkout(req, res) {
    try {
        const {workoutTitle, workoutLoad, workoutRep} = req.body;
        const newWorkout = new Workout({workoutTitle:workoutTitle, workoutLoad:workoutLoad, workoutRep:workoutRep});

        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
        
    } catch (error) {
        console.log('Error in createWorkout controller', error);
        res.status(500).json({message:'Internal server failure.'});
    }
    
}

export async function updateWorkout(req, res) {
    try {
        const {workoutTitle, workoutLoad, workoutRep} = req.body;
        const updateWorkout = await Workout.findByIdAndUpdate(req.params.id, {workoutTitle,workoutLoad,workoutRep}, {new:true});
        if (!updateWorkout) return res.status(404).json({message: "Workout not found."});

        res.status(200).json(updateWorkout);

    } catch (error) {
        console.log('Error in updateWorkout controller', error);
        res.status(500).json({message:'Internal server failure.'});
    }
}

export async function deleteWorkout(req, res) {
    try {
        const deleteWorkout = await Workout.findByIdAndDelete(req.params.id);
        if (!deleteWorkout) return res.status(404).json({message: "Workout not found."});

        res.status(200).json({message: "Workout deleted successfully."})
        
    } catch (error) {
        console.log('Error in deleteWorkout controller', error);
        res.status(500).json({message:'Internal server failure.'});
    }
}
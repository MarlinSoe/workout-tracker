import express from 'express'
import { createWorkout, deleteWorkout, getAllWorkouts, getWorkoutById, updateWorkout } from '../controllers/workoutsControllers.js';


const router = express.Router();

router.get('/', getAllWorkouts); // fetch all workouts
router.get('/:id', getWorkoutById); // fetch a specific workout
router.post('/', createWorkout); // create a workout
router.put('/:id', updateWorkout); // update a specific workout
router.delete('/:id', deleteWorkout); // delete a specific workout

export default router;
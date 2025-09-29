import '../styles/WorkoutForm.css'
import { useState } from 'react';
import { toast } from 'react-hot-toast'
import api from '../lib/axios';

function WorkoutForm ({workouts, setWorkout}) {
    const [saving, setSaving] = useState(false);
    const [workoutTitle, setWorkoutTitle] = useState('');
    const [workoutLoad, setWorkoutLoad] = useState('');
    const [workoutRep, setWorkoutRep] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!workoutTitle.trim() || !workoutLoad.trim() || !workoutRep.trim()) {
            toast.error('All field are required.')
            return;
        }


        try {
            setSaving(true);
            
            const response = await api.post('/workouts', {
                workoutTitle,
                workoutLoad,
                workoutRep
            })
            
            const createdWorkout = response.data;

            setWorkout([...workouts, createdWorkout]);

            setWorkoutTitle('')
            setWorkoutLoad('');
            setWorkoutRep('');

            toast.success('Workout created successfully.')

        } catch (error) {
            console.log(error);
            toast.error('Failed to create the workout.')
            
        } finally {
            setSaving(false);
        }
    }


    return (
        <>
            <div className="workout-form-wrapper">
                <form action="">
                    <div className="workout-form-title-container">
                        <h1>Add a New Workout</h1>
                    </div>
                    <div className="workout-form-input-container">
                        <label htmlFor="">Exercise Title</label>
                        <input type="text" value={workoutTitle} onChange={(e) => setWorkoutTitle(e.target.value)}/>
                    </div>
                    <div className="workout-form-input-container">
                        <label htmlFor="">Load (in kg)</label>
                        <input type="number" value={workoutLoad} onChange={(e) => setWorkoutLoad(e.target.value)}/>
                    </div>
                    <div className="workout-form-input-container">
                        <label htmlFor="">Reps</label>
                        <input type="number" value={workoutRep} onChange={(e) => setWorkoutRep(e.target.value)}/>
                    </div>
                    <div className='workout-button-container'>
                        <button onClick={(e) => handleCreate(e)}>{ saving ? 'creating workout...' : 'create workout' }</button>
                    </div>
                </form>
                
            </div>
        </>
    );
}

export default WorkoutForm
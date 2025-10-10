import '../styles/WorkoutCard.css'
import TrashIcon from '../assets/trash.svg'
import { timeAgo } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast'



function WorkoutCard ({workout, setWorkout}) {
    const user = JSON.parse(localStorage.getItem('user'));

    const handleDelete = async(e, id) => {
        e.preventDefault();
        try {
            await api.delete(`workouts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            toast.success('Workout deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete the workout.');
            console.log(error);
        } finally {
            setWorkout((prev) => prev.filter(workout => workout._id !== id));
        }
    }
    

    return (
        <>
            <div className="workout-individual-card-wrapper">
                <div className="workout-individual-card-title-container">
                    <h1>{workout.workoutTitle}</h1>
                    <div className='workout-individual-card-title-trash-container' onClick={(e) => handleDelete(e, workout._id)}>
                        <img src={TrashIcon} alt="" />
                    </div>
                </div>

                <div className="workout-individual-card-info-container">
                    <p><span className='bolded-text'>Loads (kg):</span> {workout.workoutLoad}</p> 
                    <p><span className='bolded-text'>Reps:</span> {workout.workoutRep}</p>
                    <p>{timeAgo(new Date(workout.createdAt))}</p>
                </div>
            </div>
        </>
    );
}

export default WorkoutCard
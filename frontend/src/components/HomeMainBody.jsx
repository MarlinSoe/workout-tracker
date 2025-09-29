import '../styles/HomeMainBody.css'
import WorkoutCard from './WorkoutCard'
import WorkoutForm from './WorkoutForm'
import toast from 'react-hot-toast'
import api from '../lib/axios';
import { useState } from 'react';


function HomeMainBody({workouts, setWorkout, loading}) {
    

    return (
        <>
            <div className='home-main-body-wrapper'>
                {
                    loading && <div>loading...</div>
                }
                <div className='workout-cards-container'>
                    {
                        workouts.length > 0 && (
                            workouts.map(workout => (
                                <WorkoutCard workout={workout} setWorkout={setWorkout} key={workout._id}/>
                            ))
                        )
                    }
                </div>
                <WorkoutForm setWorkout={setWorkout} workouts={workouts}/>
            </div>
        </>
    )
}

export default HomeMainBody
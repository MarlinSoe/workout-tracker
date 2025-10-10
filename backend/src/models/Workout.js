import mongoose from 'mongoose'

// 1. create a Schema 
// 2. create a model based on that 

const workoutSchema = new mongoose.Schema({
    workoutTitle: {
        type:'String',
        required:true,
    },
    workoutLoad: {
        type:'Number',
        required:true,
    },
    workoutRep: {
        type:'Number',
        required:true,
    },
    user_id: {
        type: String, 
        required: true
    }
}, {timestamps: true});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout
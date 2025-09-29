import HomeMainBody from "../components/HomeMainBody";
import NavBar from "../components/navBar";
import '../styles/Home.css'
import api from "../lib/axios";
import { useEffect, useState } from "react";


function Home() {
    const [workouts, setWorkout] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await api.get('/workouts');
                setWorkout(res.data);
            } catch (error) {
                console.log('Error fetching workout', error);
                toast.error('Failed to load workouts.')
            } finally {
                setLoading(false);
            }
        }
        fetchWorkout();
    }, [])

    return(
        <>
            <div className="home-wrapper">
                <NavBar />
                <HomeMainBody workouts={workouts} setWorkout={setWorkout} loading={loading} setLoading={setLoading}/>
            </div>
        </>
    );
}

export default Home;
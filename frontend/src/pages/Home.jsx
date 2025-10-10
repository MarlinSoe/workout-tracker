import HomeMainBody from "../components/HomeMainBody";
import '../styles/Home.css'
import api from "../lib/axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
    const [workouts, setWorkout] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); // ✅ Correct usage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;


    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await api.get('/workouts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setWorkout(res.data);
            } catch (error) {
                console.log('Error fetching workout', error);
                toast.error('Failed to load workouts.');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchWorkout();
        }
    }, [user, navigate]); // ✅ Include `navigate` in deps

    return (
        <div className="home-wrapper">
            <NavBar setWorkout={setWorkout} />
            <HomeMainBody workouts={workouts} setWorkout={setWorkout} loading={loading} setLoading={setLoading}/>
        </div>
    );
}

export default Home;

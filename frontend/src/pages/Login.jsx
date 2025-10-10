import { useState } from "react";
import '../styles/Signup.css'
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { Link } from "react-router-dom";

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await api.post('user/login', {
                email, 
                password
            })

            const { email: userEmail, token } = response.data;
            console.log(userEmail, token);
            localStorage.setItem('user', JSON.stringify({ email: userEmail, token }));

            setPassword('');
            setEmail('');
            setError(null)

            toast.success('Login successfully.')
            navigate('/');
            
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.error);
        } finally {
            setLoading(false)
        }
    }
    return(
        <>  
            <div className="signup-wrapper">
                <div className="workout-form-container">
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="individual-signup-title-container">
                            <h1>Login</h1>
                        </div>
                
                        <div className="individual-signup-input-container">
                            <label>Email Address</label>
                            <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="individual-signup-input-container">
                            <label>Password</label>
                            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {error && <div className="error-message"><p>{error}</p></div>}

                        <div className="individula-signup-button-container">
                            <button onClick={(e) => handleSubmit(e)} disabled={loading}>{loading ? 'Login...' : 'Login'}</button>

                        </div>

                        <div className="message-container">
                            <p>Doesn't have an account? <Link to='/signup'>Sign Up</Link></p>
                        </div>

                    </form>
                </div>
            </div>
        
        </>
    );
}

export default Login
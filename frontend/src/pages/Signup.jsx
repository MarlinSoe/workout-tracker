import { useState } from "react";
import '../styles/Signup.css'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'
import { Link } from "react-router-dom";

function Signup () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            setLoading(true)
            const response = await api.post('user/signup', {
                email, 
                password
            })

            setPassword('');
            setEmail('');
            setError(null)

            toast.success('Sign Up successfully.')
            
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
                            <h1>Sign Up</h1>
                        </div>
                
                        <div className="individual-signup-input-container">
                            <label>Email Address</label>
                            <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="individual-signup-input-container">
                            <label>Password</label>
                            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        { error && <div className="error-message"><p>{error}</p></div>}


                        <div className="individula-signup-button-container">
                            <button disabled={loading} onClick={(e) => handleSubmit(e)}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
                        </div>

                        <div className="message-container">
                            <p>Already have an account? <Link to='/login'>Login</Link></p>
                        </div>

                    </form>
                </div>
            </div>
        
        </>
    );
}

export default Signup
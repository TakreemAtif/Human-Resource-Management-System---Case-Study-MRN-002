import { useState } from 'react';
import Logo from '../../assets/logo.png'
import './forms.css'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';

function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const getDevice = () => {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) return "Android";
        if (/iPad|iPhone|iPod/.test(ua)) return "iOS";
        if (/Windows/i.test(ua)) return "Windows";
        if (/Macintosh|Mac OS X/.test(ua)) return "macOS";
        if (/Linux/i.test(ua)) return "Linux";

        return "Unknown";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const payload = {
            device: getDevice(),
            date: new Date().toISOString(),
            userAgent: navigator.userAgent
        }
        console.log(payload);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    return (
        <>
            <div className="register-container">
                <div className="logo-section">
                    <div className="logo-container">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="logo-text">
                        <h1>EZITech</h1>
                        <p>Keep Growing</p>
                    </div>
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-heading">
                            <h1>Register</h1>
                        </div>
                        <div className="form-body">
                            <div className="field-container">
                                <label htmlFor="Email">Email: </label>
                                <input
                                    type="email"
                                    id="Email"
                                    className='email-inp'
                                    placeholder='e.g email@email.com'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange} />
                            </div>
                            <div className="field-container">
                                <label htmlFor="Password">Password:</label>
                                <div className="pass-inp-container">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="Password"
                                        className="pass-inp"
                                        name="password"
                                        placeholder="Your Secret Key"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <button
                                        type="button"
                                        className="eye-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                                    </button>
                                </div>
                            </div>
                            <div className="new-here-section">
                                <p>Already have an account? <a href="/login">Login here!</a></p>
                            </div>
                            <div className="button-section">
                                <button>Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;
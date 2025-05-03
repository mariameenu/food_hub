import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const SignUpForm = () => {
    const [username,setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const [confirmError,setConfirmError] = useState("");
    const [showPass,setShowPass] = useState(false);
    const [confirmPass,setConfirmPass] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const {user,fetchUserDetails,setUser}  = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPass(!showPass);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPass(!confirmPass);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (number) => {
        return /^[0-9]{10}$/.test(number); // Checks if it's exactly 10 digits
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!validateEmail(e.target.value)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;

        // Allow only digits
        if (!/^\d*$/.test(value)) return;

        setPhone(value);

        // Validate phone number length
        if (value.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits");
        } else {
            setPhoneError("");
        }
    };
    const handlePassChange = (e) => {
        setPassword(e.target.value);       
    }
    const handleConfirmChange = (e) => {
        setConfirm(e.target.value);
       
    }
    const handleUserNameChange = (e) => {
        setUsername(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear previous errors
        setEmailError("");
        setPhoneError("");
        setConfirmError("");
        setErrorMessage("");

        if (!username || !email || !phone || !password || !confirm) {
            setErrorMessage("All fields are required");
            return;
        }
        
        if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            return;
        }
        if (!validatePhoneNumber(phone)) {
            setPhoneError("Phone number must be exactly 10 digits");
            return;
        }
        if(password != confirm){
            setConfirmError("Password do not match");
            return;
        }
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long");
            return;
        }
        const userData = { username, email, phone, password };

        try{
            const response = await fetch("http://localhost:5001/users",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            console.log("Signup API Response:", data);  // Debugging
            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            alert("User Registered Successfully");

            setUsername("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirm("");
    
            // After signup, store user details and fetch them
            if (data.token) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("user", JSON.stringify(data.user)); // Store user object
                localStorage.setItem("userEmail", data.user.email);
                setUser(data.user); // Update AuthContext state
            }

             // Update AuthContext state
            setUser(data.user);
            fetchUserDetails(); // Fetch updated user details from backend

            navigate("/dashboard");

        }
        catch(error){
            console.error("Signup Error:", error.message);
            setErrorMessage(error.message);
            alert("User Registration Failed");
        }       
    };

    return (
        <>
            <div className="login-box">
                <h3>SIGNUP</h3>
                <p className="mb-2">
                    Already have an account? <Link to="/">Login</Link> here!
                </p>
                <div className="form-group mb-2">
                    <label className="block mb-1 text-left">Username</label>
                    <input type="text" placeholder="Enter username" className="input" value={username} onChange={handleUserNameChange} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label className="block mb-1 text-left">Email</label>
                        <input type="text" placeholder="Enter email" className="input" value={email} onChange={handleEmailChange} />
                        {emailError && <p className="text-red-500 text-sm text-left">{emailError}</p>}
                    </div>
                    <div className="form-group mb-2">
                        <label className="block mb-1 text-left">Phone Number</label>
                        <input type="text" placeholder="Enter phone number" className="input" value={phone} onChange={handlePhoneChange} />
                        {phoneError && <p className="text-red-500 text-sm text-left">{phoneError}</p>}
                    </div>
                    <div className="form-group mb-6">
                        <label className="block mb-1 text-left">Password</label>
                        <input type={showPass?"text":"password"} placeholder="Enter password" className="input" value={password} onChange={handlePassChange} />
                        <div className="icon" onClick={togglePasswordVisibility}>{showPass?(<span className="hide"><EyeOff size={16}/></span>):(<span className="show"><Eye size={16}/></span>)} </div>
                    </div>
                    <div className="form-group mb-6">
                        <label className="block mb-1 text-left">Confirm Password</label>
                        <input type={confirmPass?"text":"password"} placeholder="Enter password again" className="input" value={confirm} onChange={handleConfirmChange}/>
                        <div className="icon" onClick={toggleConfirmPasswordVisibility}>{confirmPass?(<span className="hide"><EyeOff size={16}/></span>):(<span className="show"><Eye size={16}/></span>)} </div>
                        {confirmError && <p className="text-red-500 text-sm text-left">{confirmError}</p>}
                    </div>
                    <button type="submit" className="btn btn-block">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default SignUpForm;

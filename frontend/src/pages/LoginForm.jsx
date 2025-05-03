import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "./AuthContext";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
    const [email,setEmail] = useState("");
    const [emailError,setEmailError] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Added state for error messages
    const [showPass,setShowPass] = useState(false);
    const {setUser,fetchUserDetails} = useContext(AuthContext);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!validateEmail(e.target.value)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();

        //clear previous errors
        setEmailError("");
        setErrorMessage("");

        if (!email || !password ) {
            setErrorMessage("All fields are required");
            return;
        }

         // Prepare login data
         const loginData = { email, password };
         try{
            const response = await fetch("http://localhost:5001/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (!response.ok) {
                alert("Login failed");
                throw new Error(data.message || "Login failed");   

            }
            alert("Login successful");
          

            setEmail("");
            setPassword("");

             // Store token (if returned)
             if (data.token) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userEmail", email);
            }

            setUser(data.user); // Update context
            fetchUserDetails(); // Fetch user data again

            navigate("/dashboard");

         }
         catch(error){
           setErrorMessage(error.message);
         }
    }

    const togglePasswordVisibility = () => {
        setShowPass(!showPass);
    }

    return(
        <>
           <div className="login-box">
                <h3>LOGIN</h3>
                <p className="mb-2">Do not have an account? <Link to="/signup">SignUp</Link> here!</p>
                 <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label className="block mb-1 text-left">Email</label>
                            <input type="text" placeholder="Enter email" className="input" value={email} onChange={handleEmailChange} />
                            {emailError && <p className="text-red-500 text-sm text-left">{emailError}</p>}
                        </div>
                        <div className="form-group mb-6">
                            <label className="block mb-1 text-left">Password</label>
                            <input type={showPass?"text":"password"} placeholder="Enter password" className="input" value={password} onChange={handlePasswordChange} />
                            <div className="icon" onClick={togglePasswordVisibility}>{showPass?(<>
                            <span className="hide"><EyeOff size={16}></EyeOff></span></>):(<><span className="show">
                                <Eye size={16}></Eye>
                                </span></>)}</div>
                        </div>
                        <button className="btn btn-block" type="submit">Login</button>
                 </form>
           </div>
        </>
    )
}

export default LoginForm;
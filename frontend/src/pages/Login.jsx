import { Outlet } from "react-router-dom";
import loginimage from "../assets/images/login_image.png";
const Login = () => {
    return(
        <>
            <div className="login-outer flex">
                <div className="left flex-1 flex justify-center items-center">
                    <Outlet/>
                </div>
                <div className="right flex-1 flex">
                    <div className="login-image">
                        <h2>FOOD HUB</h2>
                        <img src={loginimage} className="img-fluid"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
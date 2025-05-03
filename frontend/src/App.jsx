import { AlignJustify, ChevronDown, CircleUserRound } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import './styles/styles.scss'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './pages/AuthContext'

function App() {
  const { user,setUser } = useContext(AuthContext);
  const [sideBar,setSideBar] = useState(true)
  const navigate = useNavigate();
  const location = useLocation();
  const viewCustomerRoute = location.pathname.startsWith("/dashboard/customers") || location.pathname.startsWith("/dashboard/viewcustomer");
  const storeRoute = location.pathname.startsWith("/dashboard/stores") || location.pathname.startsWith("/dashboard/newstore") || location.pathname.startsWith("/dashboard/viewstore");
  const productRoute = location.pathname.startsWith("/dashboard/products") || location.pathname.startsWith("/dashboard/newproduct") || location.pathname.startsWith("/dashboard/viewproduct");
  const customerOrderRoute =  location.pathname.startsWith("/dashboard/customerorder") ;
  const storeOrderRoute = location.pathname.startsWith("/dashboard/storeorder");

    // Handle user logout
    const handleLogout = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      setUser(null);  // Reset user in AuthContext
      navigate("/");  // Redirect to login page
    };
  
    const toggleSideBar = () => {
      setSideBar(!sideBar);
    }

  return (
    <>
       <div className={`main-outer ${!sideBar ? "close" : ""}`}>
            <div className='top-section'>
                <div className='left'>
                    <div className='flex items-center'>                       
                        <div className="drawer mr-2">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" defaultChecked />
                            <div className="drawer-content">
                              {/* Page content here */}
                              <label htmlFor="my-drawer" onClick={toggleSideBar} className="drawer-button cursor-pointer"> <AlignJustify /></label>
                            </div>
                            <div className="drawer-side">                                                         
                              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                {/* Sidebar content here */}
                                <Link className='main-logo' to="/dashboard/customers" >
                                  FOOD HUB
                                </Link>  
                                <NavLink 
                                  to="/dashboard" 
                                  end
                                  className={({ isActive }) => {
                                    const isCustomerViewProduct = location.pathname.startsWith("/dashboard/viewproduct");
                                    if (user?.role === "customer") {
                                      return (isActive || isCustomerViewProduct) ? "active" : "";
                                    }
                                    return isActive ? "active" : "";
                                  }}
                                >
                                  Home
                                </NavLink>
                                {user?.role === "store"? <NavLink to="/dashboard/storeorder" end className={storeOrderRoute?"active":""}>Orders</NavLink>:""}
                                {user?.role === "customer"? <NavLink to="/dashboard/customerorder" end className={customerOrderRoute ? "active":""}>Orders</NavLink>:""}
                                {user?.role === "admin"? <NavLink to="/dashboard/customers" end className={viewCustomerRoute ? "active":""}>Customers</NavLink>: " "}                                
                                {user?.role === "store"?<NavLink to="/dashboard/products" end className={productRoute? "active":""}>Products</NavLink>: " "}
                                {user?.role === "admin"?  <NavLink to="/dashboard/stores" end className={storeRoute?"active":""}>Stores</NavLink> : " "}                               
                              </ul>
                            </div>
                          </div>
                        <div className='f-font-bold text-lg'>
                          Welcome {user ? user.username : JSON.parse(localStorage.getItem("user"))?.username || "User"} !   
                        </div>                   
                    </div>
                </div>
                <div className='right'>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1 flex items-center justify-center">
                     <div><CircleUserRound/></div>
                     <div className='text-base'>User</div>
                     <ChevronDown />
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><Link to="" className='text-sm'>Profile</Link></li> 
                    <li><a onClick={handleLogout}>Signout</a></li>
                  </ul>
                </div>
                </div>
            </div>
            <div className='content-section'>
                  <Outlet/>
            </div>          
       </div>
    </>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import LoginForm from './pages/LoginForm.jsx'
import SignUpForm from './pages/SignUpForm.jsx'
import { AuthProvider } from './pages/AuthContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Customers from './pages/Customers.jsx'
import ViewCustomer from './pages/ViewCustomer.jsx'
import Stores from './pages/Stores.jsx'
import NewStore from './pages/NewStore.jsx'
import ViewStore from './pages/ViewStore.jsx'
import Products from './pages/Products.jsx'
import NewProduct from './pages/NewProduct.jsx'
import ViewProduct from './pages/viewProduct.jsx'
import CustomerOrder from './pages/CustomerOrder.jsx'
import StoreOrder from './pages/StoreOrder.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
     <BrowserRouter>
        <Routes>
           {/* Landing Page Layout */}
           <Route path='/' element={<Login></Login>}>  
               <Route index element={<LoginForm></LoginForm>}/>
               <Route path="signup" element={<SignUpForm/>} />
           </Route>
           {/* Dashboard Layout */}
           <Route path='/dashboard' element={<App></App>}>   
               <Route index element={<Dashboard/>}/>   
               <Route path="customers" element={<Customers/>}/>  
               <Route path='viewcustomer/:id' element={<ViewCustomer/>}/>    
               <Route path='stores' element={<Stores/>} />
               <Route path='products' element={<Products/>}/>
               <Route path='viewproduct/:id' element={<ViewProduct/>}/>
               <Route path='viewstore/:id' element={<ViewStore/>} />
               <Route path='newstore' element={<NewStore/>} />
               <Route path='newproduct' element={<NewProduct/>}/>
               <Route path="customerorder" element={<CustomerOrder/>}/>
               <Route path="storeorder" element={<StoreOrder/>}/>
           </Route>
        </Routes>
     </BrowserRouter>
     </AuthProvider>
  </StrictMode>,
)

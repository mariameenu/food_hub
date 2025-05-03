import { CircleDollarSign, CookingPot, Dock, File, ShoppingBasket, Store, User } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Menu from "./Menu";

const Dashboard = () => {
    const {countCustomer, customerList, countStore, storeList, user, countProduct, countOrder } = useContext(AuthContext);
    const [selectedStore,setSelectedStore] = useState(null);   
    const orderData = customerList && customerList.length > 0
    ? customerList
        .sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0))
        .slice(0, 5)
        .map(customer => ({
          name: customer.username,
          orders: customer.orderCount || 0,
        }))
    : [];
    return(
        <>
           {user?.role === "admin" ?  <div className="boxes mt-6 flex justify-content-center items-center gap-4">
                <div className="group flex-1">
                    <div className="flex justify-between items-start"> 
                        <h3>Total Customers</h3>
                        <div className="round">
                        <User />
                        </div>                       
                    </div>
                    <div className="number">
                        {countCustomer}
                    </div>
                </div>
                <div className="group flex-1">
                    <div className="flex justify-between items-start"> 
                        <h3>Total Stores</h3>
                        <div className="round peach">
                        <Store />
                        </div>                       
                    </div>
                    <div className="number">
                    {countStore}
                    </div>
                </div>
                <div className="group flex-1">
                    <div className="flex justify-between items-start"> 
                        <h3>Total Products</h3>
                        <div className="round blue">
                        <CookingPot/>
                        </div>                       
                    </div>
                    <div className="number">
                       {countProduct}
                    </div>
                </div>
                <div className="group flex-1">
                    <div className="flex justify-between items-start"> 
                        <h3>Total Orders</h3>
                        <div className="round orange">
                        <Dock />
                        </div>                       
                    </div>
                    <div className="number">
                        {countOrder}
                    </div>
                </div>
           </div> : " "}
           {user?.role === "store" ?  <div className="boxes mt-6 flex justify-content-center items-center gap-4">
                <div className="group flex-1">
                    <div className="flex justify-between items-start"> 
                        <h3>Total Orders</h3>
                        <div className="round">
                        <File />
                        </div>                       
                    </div>
                    <div className="number">
                        {countCustomer}
                    </div>
                </div>
                <div className="group flex-1">
                    <div className="flex justify-between items-start"> 
                        <h3>Total Products</h3>
                        <div className="round peach">
                        <ShoppingBasket />
                        </div>                       
                    </div>
                    <div className="number">
                    {countStore}
                    </div>
                </div>
                <div className="group flex-1">
                    <div className="flex justify-between items-start"> 
                        <h3>Customer Count</h3>
                        <div className="round blue">
                        <User />
                        </div>                       
                    </div>
                    <div className="number">
                        100
                    </div>
                </div>
                <div className="group flex-1">
                    <div className="flex justify-between items-start"> 
                        <h3>Total Revenue</h3>
                        <div className="round orange">
                            <CircleDollarSign />
                        </div>                       
                    </div>
                    <div className="number">
                        100
                    </div>
                </div>
           </div> : " "}
          {user?.role === "admin" ? 
        <>
          <div className="graph-table">
                <div className="table-box">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="mb-0">Customers</h3>
                        <Link to="/dashboard/customers" className="btn f-btn">View More</Link>
                    </div>
                    <div className="overflow-x-auto rounded-box">
                        <table className="table f-table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Sl. No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Orders</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customerList && customerList.length > 0 ? (
                                    customerList.slice(0, 7).map((list, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{list.username}</td>
                                        <td>{list.email}</td>
                                        <td>{list.phone}</td>
                                        <td>{list.orderCount || 0}</td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="5" className="text-center">No customers found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="graph">
                   <h3 className="mb-4">Orders</h3>
                   <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={orderData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="orders" stroke="#573631" strokeWidth={2} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis  allowDecimals={false} />
                        <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
           </div>
           <div className="graph-table">
                <div className="table-box">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="mb-0">Stores</h3>
                        <Link to="/dashboard/stores" className="btn f-btn">View More</Link>
                    </div>
                    <div className="overflow-x-auto rounded-box">
                        <table className="table f-table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Sl. No</th>
                                <th>Store Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Products</th>
                            </tr>
                            </thead>
                            <tbody>
                            {storeList && storeList.length > 0 ? (
                                    storeList.slice(0, 7).map((list, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{list.username}</td>
                                        <td>{list.email}</td>
                                        <td>{list.phone}</td>
                                        <td>10</td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="5" className="text-center">No customers found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="graph">
                </div>
           </div> 
        </>: ""}
        {user?.role == "customer" ? 
        <div className="customer-section">
            <h3 className="text-2xl mb-4 f-font-bold primary">Choose a store</h3>
            <div className="store-list">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {storeList && storeList.length > 0 ? (<>
                    {storeList.map((store,index) => (
                        <div
                        key={index}
                        className={`store ${selectedStore?._id === store._id ? "active" : ""}`}
                        onClick={() => {
                          setSelectedStore(store);                        
                        }}
                      >{store.username}</div>
                    ))}</>) : (<>
                        <div className="">No stores found</div></>)}
                </div>                
            </div>
            {selectedStore && (
                <div className="menu-section mt-6">
                    <Menu store={selectedStore} />
                </div>
            )}
        </div>: ""}
        </>
    )
}

export default Dashboard;
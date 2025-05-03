import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Eye, Pen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Customers = () => {
    const {customerList} = useContext(AuthContext);
    return(
        <>
               <h3 className="mb-4 mt-6 text-left text-xl f-font-bold">Customers</h3>      
               <div className="table-box mt-6">                  
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
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customerList && customerList.length > 0 ? (
                                    customerList.map((list, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{list.username}</td>
                                        <td>{list.email}</td>
                                        <td>{list.phone}</td>
                                        <td>10</td>
                                        <td width="100px">
                                            <div className="action-buttons">
                                                <Link to={`/dashboard/viewcustomer/${list._id}`} className="icon blue-color"><Eye/></Link> 
                                            </div>
                                        </td>
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
        </>
    )
}

export default Customers;
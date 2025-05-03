import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Eye, Trash2 } from "lucide-react";

const Stores = () => {
    const {storeList, setStoreList} = useContext(AuthContext);
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this store?")) {
            try {
                const response = await fetch(`http://localhost:5001/users/deletestore/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (response.ok) {
                    alert("Store deleted successfully!");
                    // Update local state after deletion
                    const updatedList = storeList.filter(store => store._id !== id);
                    setStoreList(updatedList);
                } else {
                    alert(data.message || "Failed to delete store");
                }
            } catch (error) {
                console.error("Error deleting store:", error);
                alert("Something went wrong!");
            }
        }
    }

    return(
        <>
              <div className="flex items-center justify-between mt-6 mb-6">
                        <h3 className="text-left text-xl f-font-bold">Stores</h3>
                        <Link to="/dashboard/newstore" className="btn f-btn">Add New</Link>
              </div> 
               <div className="table-box">                  
                    <div className="overflow-x-auto rounded-box">
                        <table className="table f-table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Sl. No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Products</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                {storeList && storeList.length > 0 ? (
                                        storeList.map((list, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{list.username}</td>
                                            <td>{list.email}</td>
                                            <td>{list.phone}</td>
                                            <td>10</td>
                                            <td width="100px">
                                            <div className="action-buttons">
                                                <Link to={`/dashboard/viewstore/${list._id}`} className="icon blue-color mr-2"><Eye/></Link> 
                                               <a className="icon red-color delete-icon" onClick={() => handleDelete(list._id)}><Trash2 /></a>
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

export default Stores;
import { Eye } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./AuthContext";

const Products = () => {
     
    const {storeProductList} = useContext(AuthContext);
    
    return(
        <>
              <div className="flex items-center justify-between mt-6 mb-6">
                    <h3 className="text-left text-xl f-font-bold">Products</h3>
                <Link to="/dashboard/newproduct" className="btn f-btn">Add New</Link>
              </div>       
               <div className="table-box mt-6">                  
                    <div className="overflow-x-auto rounded-box">
                        <table className="table f-table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th width="100px">Sl. No</th>
                                <th>Name</th>
                                <th width="200px">Price</th>
                                <th width="250px">Category</th>
                                <th width="200px">Status</th>
                                <th width="200px">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                               {storeProductList && storeProductList.length > 0 ? (storeProductList.map((product,index)=> (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.status}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/dashboard/viewproduct/${product._id}`} className="icon blue-color mr-2"><Eye/></Link> 
                                        </div>
                                    </td>
                                    </tr>))) : (
                                        <tr>
                                        <td colSpan="6" className="text-center">No products found</td>
                                      </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
               </div>
        </>
    )
}

export default Products
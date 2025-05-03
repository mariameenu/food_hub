import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {productList,user} = useContext(AuthContext);
    const product = productList?.find((c) => c._id === id);

    const handlePreOrder = async () => {
        try{
            const response = await fetch("http://localhost:5001/orders",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json",
                },
                body : JSON.stringify({
                    name : product.name,
                    customer: user?.username,
                    customerId : user?._id,
                    store:  product.storeId, // Make sure this exists on your product object
                    storename : product.storeId.username,
                    price: product.price,
                    status: "Pending",
                })
            });
            const data = await response.json();
            if (response.ok) {
                alert("Pre-order placed successfully!");
                navigate("/dashboard/customerorder");
                console.log(data);
              } else {
                alert("Failed to place pre-order.");
              }
        }
        catch(error){
            console.error("Pre-order error:", error);
            alert("Something went wrong.");
        }
    }

    return(
        <>
             <div className="flex items-center justify-between mt-6 mb-6">
                <h3 className="text-left text-xl f-font-bold">Product Details</h3>
                <div>
                    <Link to={user?.role === "store"? "/dashboard/products": "/dashboard"} className="btn red mr-2 f-btn">Cancel</Link>                    
                </div>
        </div> 
        <div className="table-box">                  
             <div className="overflow-x-auto rounded-box flex new-product">
                <div className="left">
                <div className="view-content relative">
                <label>Image</label>
                <div className="preview-image flex items-center justify-center h-[300px] overflow-hidden mt-2">
                    {product?.imageUrl ? (
                    <img src={`http://localhost:5001/uploads/${product.imageUrl}`} alt="Product" className="object-cover w-full h-full" />
                    ) : (
                    <div className="text-gray-500">No image available</div>
                    )}
                </div>
                </div>           
                </div>
                <div className="right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                   
                    <div className="view-content">
                        <label>Name</label>
                        <div className="mt-2">
                          <div className="data">{product.name}</div>
                        </div>
                    </div>
                    <div className="view-content">
                        <label>Price</label>
                        <div className="mt-2">
                          <div className="data">{product.price}</div>
                        </div>
                    </div>                  
                    <div className="view-content">
                        <label>Category</label>
                        <div className="mt-2">
                          <div className="data">{product.category}</div>
                        </div>
                    </div>    
                    <div className="view-content">
                        <label>Status</label>
                        <div className="mt-2">
                          <div className="data">{product.status}</div>
                        </div>
                    </div> 
                </div>
                <div className="grid grid-cols-1 mt-4">
                    <div className="view-content">
                        <label>Description</label>
                        <div className="mt-2">
                          <div className="data">{product.description}</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-4">
                    <div className="view-content">
                        {user?.role == "customer" ? <button className="btn f-btn" onClick={handlePreOrder}>Pre-Order</button> :""}
                    </div>
                </div>
                </div>            
             </div>
         </div>
        </>
    )
}

export default ViewProduct;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({store})  => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (store) {
          fetch(`http://localhost:5001/products/productofstore?storeId=${store._id}`) 
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products", err));
        }
      }, [store]);
    return(
        <div>
        <h4 className="text-xl f-font-bold mb-4">Menu</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.length > 0 ? (
            products.map((product, index) => (
                <div key={index} className="border rounded-md shadow-sm">
                    <div className="menu-image flex items-center justify-center h-[300px] overflow-hidden">
                        {product?.imageUrl ? (
                        <img src={`http://localhost:5001/uploads/${product.imageUrl}`} alt="Product" className="object-cover w-full h-full" />
                        ) : (
                        <div className="text-gray-500">No image available</div>
                        )}
                    </div>
                    <h5 className="f-font-bold name">{product.name}</h5>
                    <p className="desc">{product.description}</p>
                    <div className="flex justify-between items-center amount-detail">
                        <div className="left">
                             <p className="text-sm font-medium">₹{product.price}</p>
                         </div>
                         <div className="right">
                            <Link to={`/dashboard/viewproduct/${product._id}`} className="btn f-btn">View Details</Link>
                         </div>
                    </div>
                </div>
            ))
            ) : (
            <p>No products found</p>
            )}
        </div>
        </div>
    )
}

export default Menu;
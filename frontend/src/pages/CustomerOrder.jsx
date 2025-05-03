import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const CustomerOrder = () => {
    const {customerOrder,user,setCustomerOrder} = useContext(AuthContext);
    const myOrders = customerOrder?.filter(order => order.customerId === user?._id);
    const collected =async (orderId) => {
        try{
            const res = await fetch(`http://localhost:5001/orders/updatecustomerstatus/${orderId}`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify({role:"customer", newStatus : "Payment Pending"})
            });
            const updatedOrder = await res.json();
            setCustomerOrder(prev =>
                prev.map(o => (o._id === updatedOrder._id ? updatedOrder : o))
            );
            const resstore = await fetch(`http://localhost:5001/orders/updatestorestatus/${orderId}`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify({role:"store", storeStatus : "Collected"})
            });
            const updatedStoreOrder = await resstore.json();
            const merged = {
                ...updatedOrder,
                ...updatedStoreOrder,
              };
          
            setCustomerOrder(prev =>
                prev.map(o => (o._id === merged._id ? merged : o))
              );
        }
        catch(error){

        }
    }
    return(
        <>
             <div className="flex items-center justify-between mt-6 mb-6">
                <h3 className="text-left text-xl f-font-bold">Orders</h3>               
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
                                <th width="250px">Store Name</th>
                                <th width="200px">Status</th>                               
                            </tr>
                            </thead>
                            <tbody>
                               {myOrders && myOrders.length > 0 ? (myOrders.map((customer,index)=> (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.price}</td>
                                    <td>{customer.storename}</td>
                                    <td>{customer.status.customer === "Ready to collect"?(<>
                                        <button className="btn f-btn peach ml-2" onClick={() => collected(customer._id)}>
                                            Collect
                                        </button>
                                    </>):(<>{customer.status.customer}</>)}</td>                                  
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

export default CustomerOrder;
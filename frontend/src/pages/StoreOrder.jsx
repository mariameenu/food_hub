import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const StoreOrder = () => {
    const {orders,setOrders,user} = useContext(AuthContext);   
    
   const orderAccepted = async (orderId) =>{
        try{
            const res = await fetch(`http://localhost:5001/orders/updatecustomerstatus/${orderId}`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify({role:"customer", newStatus : "Order Accepted"})
            });
            const updatedOrder = await res.json();
            setOrders(prev =>
                prev.map(o => (o._id === updatedOrder._id ? updatedOrder : o))
              );

              const resstore = await fetch(`http://localhost:5001/orders/updatestorestatus/${orderId}`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify({role:"store", storeStatus : "Accepted"})
            });
            const updatedStoreOrder = await resstore.json();
            const merged = {
                ...updatedOrder,
                ...updatedStoreOrder,
              };
          
            setOrders(prev =>
                prev.map(o => (o._id === merged._id ? merged : o))
              );
        }
        catch(error){
            console.error("Error accepting order:", error);
        }
   }
   const prepare = async (orderId) => {
    try{
        const res = await fetch(`http://localhost:5001/orders/updatecustomerstatus/${orderId}`,{
            method : "PATCH",
            headers : { "Content-Type": "application/json"},
            body: JSON.stringify({role:"customer", newStatus : "Preperation Started"})
        });
        const updatedOrder = await res.json();
        setOrders(prev =>
            prev.map(o => (o._id === updatedOrder._id ? updatedOrder : o))
          );
          const resstore = await fetch(`http://localhost:5001/orders/updatestorestatus/${orderId}`,{
            method : "PATCH",
            headers : { "Content-Type": "application/json"},
            body: JSON.stringify({role:"store", storeStatus : "Preperation Started"})
        });
        const updatedStoreOrder = await resstore.json();
        const merged = {
            ...updatedOrder,
            ...updatedStoreOrder,
          };
      
        setOrders(prev =>
            prev.map(o => (o._id === merged._id ? merged : o))
          );
    }
    catch(error){
        console.error("Error accepting order:", error);
    }
   }
   const completed = async (orderId) =>{
        try{
            const res = await fetch(`http://localhost:5001/orders/updatecustomerstatus/${orderId}`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify({role:"customer", newStatus : "Ready to collect"})
            });
            const updatedOrder = await res.json();
            setOrders(prev =>
                prev.map(o => (o._id === updatedOrder._id ? updatedOrder : o))
            );
            const resstore = await fetch(`http://localhost:5001/orders/updatestorestatus/${orderId}`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify({role:"store", storeStatus : "Waiting to  collect"})
            });
            const updatedStoreOrder = await resstore.json();
            const merged = {
                ...updatedOrder,
                ...updatedStoreOrder,
              };
          
            setOrders(prev =>
                prev.map(o => (o._id === merged._id ? merged : o))
              );
        }
        catch(error){
            console.error("Error accepting order:", error);
        }
   }
   const payment = async (orderId) => {
        try{
            const res = await fetch(`http://localhost:5001/orders/updatecustomerstatus/${orderId}`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify({role:"customer", newStatus : "Payment Done"})
            });
            const updatedOrder = await res.json();
            setOrders(prev =>
                prev.map(o => (o._id === updatedOrder._id ? updatedOrder : o))
            );
            const resstore = await fetch(`http://localhost:5001/orders/updatestorestatus/${orderId}`,{
                method : "PATCH",
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify({role:"store", storeStatus : "Paid"})
            });
            const updatedStoreOrder = await resstore.json();
        }
        catch(error){
            console.error("Error accepting order:", error);
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
                                <th>Item Name</th>
                                <th width="200px">Price</th>
                                <th width="250px">Customer Name</th>
                                <th width="200px">Status</th>  
                                <th width="200px">Pending Action</th>                                
                            </tr>
                            </thead>
                            <tbody>
                            {orders?.length ? (
                                    orders.map((order, i) => (
                                    <tr key={order._id}>
                                        <td>{i+1}</td>
                                        <td>{order.name}</td>
                                        <td>{order.price}</td>
                                        <td>{order.customer}</td>
                                        <td>
                                        { order.status.store === "Accepted" && (
                                                <>
                                                    Accepted
                                                </>
                                            )
                                        }
                                         { order.status.store === "Preperation Started" && (
                                                <>
                                                    Preperation Started
                                                </>
                                            )
                                        }
                                        { order.status.store === "Waiting to  collect" && (
                                                <>
                                                   Completed
                                                </>
                                            )
                                        }
                                          { order.status.store === "Collected" && (
                                                <>
                                                   Collected
                                                </>
                                            )
                                        }
                                         { order.status.store === "Paid" && (
                                                <>
                                                   Payment Done
                                                </>
                                            )
                                        }
                                        </td>
                                        <td>                                       
                                        {order.status.store === "Got Order" &&(
                                            <>
                                                 <button
                                                    className="btn f-btn"
                                                    onClick={() => orderAccepted(order._id)}
                                                >
                                                    Accept
                                                </button>
                                                <button className="btn f-btn red ml-2">
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                         { order.status.store === "Accepted" && (
                                                <>
                                                    <button className="btn blue f-btn ml-2" onClick={() => prepare(order._id)}>
                                                    Start Preperation
                                                    </button>
                                                </>
                                            )
                                        }
                                         { order.status.customer === "Preperation Started" && (
                                                <>
                                                    <button className="btn blue orange f-btn ml-2" onClick={() => completed(order._id)} >
                                                        Completed
                                                    </button>
                                                </>
                                            )
                                        }
                                        { order.status.customer === "Payment Pending" && (
                                                <>
                                                    <button className="btn peach f-btn ml-2" onClick={() => payment(order._id)} >
                                                        Payment Pending
                                                    </button>
                                                </>
                                            )
                                        }
                                         { order.status.customer === "Ready to collect" && (
                                                <>
                                                   Awaiting Pickup
                                                </>
                                            )
                                        }
                                    </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="5" className="text-center">No orders</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
               </div>
        </>
    )
}
export default StoreOrder;
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ViewStore = () => {
    const {id} = useParams();
    const {storeList} = useContext(AuthContext);

    const store = storeList?.find((c) => c._id === id);
   
    return(       
        <> 
            <h3 className="mb-4 mt-6 text-left text-xl f-font-bold">Store Detail</h3>      
            <div className="table-box mt-6">                  
                <div className="overflow-x-auto rounded-box">
                {store ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="view-content">
                            <label>Name</label>
                            <div className="data">{store.username}</div>
                        </div>

                        <div className="view-content">
                            <label>Email</label>
                            <div className="data">{store.email}</div>
                        </div>

                        <div className="view-content">
                            <label>Phone</label>
                            <div className="data">{store.phone}</div>
                        </div>

                        <div className="view-content">
                            <label>Orders</label>
                            <div className="data">10</div>
                        </div>

                        <div className="view-content">
                            <label>Address</label>
                            <div className="data">{store.address || "Not Provided"}</div>
                        </div>
                        </div>
                    ) : (
                        <p className="text-center">Customer not found</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default ViewStore;
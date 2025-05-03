import { useRef } from "react";
import { Link } from "react-router-dom";

const NewStore = () => {
    const nameRef = useRef();
    const emailRef = useRef();  
    const passwordRef = useRef();
    const phonedRef = useRef();

    const handleSave = async () => {
        const storeData = {
            username : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
            phone : phonedRef.current.value,
            role: "store"           
        };   
    const res = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storeData),
      });
  
      if (res.ok) {
        console.log("Store created!");
      } else {
        console.log("Error adding store");
      }
    };
    return(<>
        <div className="flex items-center justify-between mt-6 mb-6">
                <h3 className="text-left text-xl f-font-bold">Add New Store</h3>
                <div>
                    <Link to="/dashboard/stores" className="btn red mr-2 f-btn">Cancel</Link>
                     <Link to="/dashboard/newstore" className="btn f-btn" onClick={handleSave}>Save</Link>
                </div>
        </div> 
        <div className="table-box">                  
             <div className="overflow-x-auto rounded-box">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="view-content">
                        <label>Name</label>
                        <div className="mt-2">
                            <input type="text" className="input w-full"  ref={nameRef}/>
                        </div>
                    </div>
                    <div className="view-content">
                        <label>Email</label>
                        <div className="mt-2">
                            <input type="text" className="input w-full" ref={emailRef} />
                        </div>
                    </div>                  
                    <div className="view-content">
                        <label>Password</label>
                        <div className="mt-2">
                            <input type="text" className="input w-full" ref={passwordRef} />
                        </div>
                    </div>    
                    <div className="view-content">
                        <label>Phone Number</label>
                        <div className="mt-2">
                            <input type="text" className="input w-full" ref={phonedRef} />
                        </div>
                    </div>                   
                </div>
             </div>
         </div>
    </>)
}

export default NewStore;
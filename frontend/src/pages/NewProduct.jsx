import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const NewProduct = () => {
    const nameRef = useRef();
    const pricelRef = useRef();
    const categoryRef = useRef();
    const statusRef = useRef();
    const descriptionRef = useRef();
    
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [filename,setFileName] = useState("");

    const {user}= useContext(AuthContext);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("price",pricelRef.current.value);
        formData.append("category",categoryRef.current.value);
        formData.append("status",statusRef.current.value);
        formData.append("description",descriptionRef.current.value);
        if(image){
            formData.append("image",image);
        }  
        const res = await fetch("http://localhost:5001/products", {
            method: "POST",
            headers: {                
                "x-user-id": user._id
             },
            body: formData,
        });
    
        if (res.ok) {
            alert("Product created!");
            navigate("/dashboard/products");
        } else {
            alert("Error adding product");
        }
    };
    return(
        <>
             <div className="flex items-center justify-between mt-6 mb-6">
                <h3 className="text-left text-xl f-font-bold">Add New Product</h3>
                <div>
                    <Link to="/dashboard/products" className="btn red mr-2 f-btn">Cancel</Link>
                     <a className="btn f-btn" onClick={handleSave}>Save</a>
                </div>
        </div> 
        <div className="table-box">                  
             <div className="overflow-x-auto rounded-box flex new-product">
                <div className="left">
                    <div className="view-content relative">
                        <label>Image</label>
                         <div className="upload-input mt-2">
                         <input type="file" className="input w-full product-image-input" onChange={handleImageChange} />
                         <div className="name-file input">{filename?filename:"Choose a file"}</div>
                         <div className="upload-button">Upload</div>
                         </div>
                        <div className="preview-image flex items-center justify-center h-[300px] overflow-hidden">                          
                            {preview?<img src={preview} alt="Preview" className="object-cover w-full h-full"/> : "Preview here" }
                        </div>
                    </div>                   
                </div>
                <div className="right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                   
                    <div className="view-content">
                        <label>Name</label>
                        <div className="mt-2">
                            <input type="text" className="input w-full"  ref={nameRef}/>
                        </div>
                    </div>
                    <div className="view-content">
                        <label>Price</label>
                        <div className="mt-2">
                            <input type="text" className="input w-full" ref={pricelRef} />
                        </div>
                    </div>                  
                    <div className="view-content">
                        <label>Category</label>
                        <div className="mt-2">
                            <input type="text" className="input w-full" ref={categoryRef} />
                        </div>
                    </div>    
                    <div className="view-content">
                        <label>Status</label>
                        <div className="mt-2">
                            <input type="text" className="input w-full" ref={statusRef} />
                        </div>
                    </div> 
                </div>
                <div className="grid grid-cols-1 mt-4">
                    <div className="view-content">
                        <label>Description</label>
                        <div className="mt-2">                            
                            <textarea className="textarea w-full" rows="4" ref={descriptionRef}></textarea>
                        </div>
                    </div>
                </div>
                </div>            
             </div>
         </div>
        </>
    )
}

export default NewProduct;
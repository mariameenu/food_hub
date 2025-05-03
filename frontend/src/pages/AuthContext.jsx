import { createContext, useEffect, useState } from "react";

//create AuthContext
export const AuthContext = createContext();

//create Auth Provider
export const AuthProvider = ({children}) => {

    const[user,setUser] = useState([]);
    const [countCustomer,setCountCustomer] = useState("");
    const [customerList,setCustomerList] = useState([]);
    const [countStore,setCountStore] = useState("");
    const [storeList,setStoreList] = useState([]);
    const [productList,setProductList] = useState([]);    
    const [storeProductList,setStoreProductList] = useState([]);  
    const [customerOrder,setCustomerOrder] = useState([]);
    const[orders,setOrders] = useState([]);
    const[countProduct,setCountProduct] = useState("");
    const [countOrder,setCountOrder] = useState("");

    // Fetch user data when the component mounts
        useEffect(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
            console.log("Stored User Found:", storedUser); // Debugging log
            setUser(JSON.parse(storedUser));
            }
        }, []);

   // Function to fetch user details from localStorage (after login)
   const fetchUserDetails = () => {
    const token = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");

    if (token && userEmail) {
        fetch("http://localhost:5001/users", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched Users:", data); // Debugging
            const loggedInUser = data.find((u) => u.email === userEmail);
            if (loggedInUser) {
                setUser(loggedInUser);
                localStorage.setItem("user", JSON.stringify(loggedInUser));
            } else {
                console.log("User not found in response");
            }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
    };
    useEffect(() => {
        fetchUserDetails();
        // count customers
        const requestOptions = {
        method: "GET",        
        redirect: "follow"
        };
        fetch("http://localhost:5001/users/countcustomer", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result.count);
            setCountCustomer(result.count);
        }   )
        .catch((error) => console.error(error));
        //customer list    
        fetch("http://localhost:5001/users", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setCustomerList(result);
        })
        .catch((error) => console.error(error));
        // store count
        fetch("http://localhost:5001/users/countstore", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setCountStore(result.count);
        })
        .catch((error) => console.error(error));
        //store list
        fetch("http://localhost:5001/users/stores", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setStoreList(result);
        })
        .catch((error) => console.error(error));
        //product list
        fetch("http://localhost:5001/products", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setProductList(result);
        }) 
        // product count
        fetch("http://localhost:5001/products/countproduct", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            setCountProduct(result);
        })
        //order count
        fetch("http://localhost:5001/orders/countorders", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            setCountOrder(result);
        })        
        .catch((error) => console.error(error));       
        }, []);

        useEffect(() => {
            if (user && user._id) {
                // product of a particular store
                fetch("http://localhost:5001/products/storeproducts", {
                method: "GET",
                headers: {
                    "x-user-id": user._id
                },
                redirect: "follow"
                })
                .then((response) => response.json())
                .then((result) => {
                console.log("Store products:", result);
                setStoreProductList(result);
                })
                .catch((error) => console.error("Error fetching store products:", error));
                 //order list
                fetch("http://localhost:5001/orders", {
                    method: "GET",
                    headers: {
                        "x-user-id": user._id
                    },
                    redirect: "follow"
                    })
                .then((response) => response.json())
                .then((result) => {
                    console.log("Orders is");
                    console.log(result);
                    setCustomerOrder(result);
                })
                .catch((error) => console.error(error));
            }
            if (user && user._id && user.role === "store") {
                fetch("http://localhost:5001/orders/storeorder", {
                    method: "GET",
                    headers: {
                        "x-user-id": user._id
                    }
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log("Store Orders:", result);
                    setOrders(result);
                })
                .catch((error) => console.error("Error fetching store orders:", error));
            }
        }, [user]);
      

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUserDetails, countCustomer, customerList, orders,setOrders, countStore, storeList, setStoreList, 
        productList,storeProductList,customerOrder, setCustomerOrder, countProduct, countOrder }}>
            {children}
        </AuthContext.Provider>
    );
}
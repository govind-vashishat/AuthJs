import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Navbar from '../components/Navbar';
export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const generateError = (err) => 
        toast.error(err, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const {data} = await axios.post("http://localhost:4000/register", {
            ...values,
           }, {
            withCredentials: true,
           }); 
           console.log(data);
           if(data) {
            if(data.errors){
                const { email, password } = data.errors;
                if (email) generateError(email);
                else if (password) generateError(password);
            } else {
                navigate("/");
            }
           }
        } catch (err) {
            console.log(err);
        }
    };

  return ( 
    <>
    <Navbar/>
    <div> 
    <div className="container">
    <h2>Register Account</h2>
    <form onSubmit={(e)=>handleSubmit(e)} >
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name= "email" placeholder="Email"
            onChange={(e)=> setValues({...values,[e.target.name]:e.target.value})} />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name= "password" placeholder="Password" 
            onChange={(e)=> setValues({...values,[e.target.name]:e.target.value})} />
        </div>
        <button type="submit">Submit</button>
        <span>
            Already have an account? <Link to="/login">Login</Link>
        </span>
    </form>
    <ToastContainer />
    </div>
    </div>
    </>
  )
}

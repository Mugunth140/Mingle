import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import  { toast } from "react-hot-toast";

//react icons

import { GoPerson } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import { FiLock, FiLoader } from "react-icons/fi";
import { RiEyeOffLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const {signup, isSignup} = useAuthStore();

  const validateForm = () => {
   if(!formdata.username.trim() || !formdata.email.trim() || !formdata.password.trim()) return toast.error("All fields are required");
   if(!/\S+@\S+\.\S+/.test(formdata.email)) return toast.error("Invalid email address");
   if(formdata.password.length < 8) return toast.error("Password must be at least 8 characters");

   return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const success = validateForm();
    if(success) {
      signup(formdata);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="form-container" style={{ "--icon-color": "var(--neutral)" }}>
      <center >
       <img src="/logo.png" alt="logo" height={64} width={64}/>
        </center>
        <h1>Create Account</h1>
        <p>Get started with your free account</p>
        <label>
          <span>Name</span>
        </label>
        <div className="form-item">
          <GoPerson color="lightgrey" />
          <input
            type="text"
            placeholder="John Deo"
            name="name"
            value={formdata.name}
            onChange={(e) => setFormdata({ ...formdata, username: e.target.value })}
          />
        </div>
        <label>
          <span>Email</span>
        </label>
        <div className="form-item">
          <MdOutlineMail color="lightgrey" />
          <input
            type="email"
            placeholder="you@example.com"
            name="email"
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
          />
        </div>
        <label>
          <span>Password</span>
        </label>
        <div className="form-item">
          <FiLock color="lightgrey" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="example@123"
            name="password"
            value={formdata.password}
            onChange={(e) =>
              setFormdata({ ...formdata, password: e.target.value })
            }
          />
          <button
            type="button"
            className="showpassword-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <RiEyeOffLine color="lightgrey" size={15} />
            ) : (
              <FaRegEye color="lightgrey" size={15} />
            )}
          </button>
        </div>
        <button type='submit' disabled={isSignup} className="submit-btn">{isSignup ? <FiLoader size={20} style={{ color: "var(--icon-color)"}} className='spinner' /> : 'create account'}</button>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

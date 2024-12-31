import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { RiEyeOffLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiLoader } from 'react-icons/fi';
import '../sass/pages/LoginPage.scss';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const {login, isLogin} = useAuthStore();

  const validateForm = () => {
    if( !formdata.email.trim() || !formdata.password.trim()) return toast.error("All fields are required");
    if(!/\S+@\S+\.\S+/.test(formdata.email)) return toast.error("Invalid email address");
    if(formdata.password.length < 8) return toast.error("Password must be at least 8 characters");
 
    return true;
   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success) {
      login(formdata);
    }
  }

  return (
    <>
     <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container" style={{ "--icon-color": "var(--primary)" }}>
        <center >
       <img src="/logo.png" alt="logo" height={64} width={64}/>
        </center>
        <h1>Welcome to Mingle</h1>
        <p>Signin to your account</p>
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
        <button type='submit' disabled={isLogin} className="submit-btn">{isLogin ? <FiLoader size={20} style={{ color: "var(--icon-color)"}} className='spinner' /> : 'login'}</button>
        <p>
          Don`&asop;`t have an account ? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default LoginPage
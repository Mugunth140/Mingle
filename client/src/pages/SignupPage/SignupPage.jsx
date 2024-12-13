import  {React, useState} from 'react'
import "./SignupPage.scss"
// import { useAuthStore } from '../store/useAuthStore'

//react icons
import { IoIosContact } from "react-icons/io";

const SignupPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
  });

  // const [signup, isSignup] = useAuthStore();

  // const validateForm = () => {
  //   const { name, email, password } = formdata;
  //   if (!name || !email || !password) {
  //     alert('Please fill in all fields');
  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { name, email, password } = formdata;
      await signup(name, email, password);
      setFormdata({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit} className='form-container'>
        <h1>Create Account</h1>
        <input type='text' placeholder='name' name='name' value={formdata.name} onChange={handleChange} />
        <input type='email' placeholder='email' name='email' value={formdata.email} onChange={handleChange} />
        <input type={showPassword ? 'text' : 'password'} placeholder='password' name='password' value={formdata.password} onChange={handleChange} />
        <button type='submit'className=''>Submit</button>
        <p>
          already have an account ? <a href="/login">login</a>
       </p>
      </form>
    </div>
  )
}

export default SignupPage
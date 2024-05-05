import { login } from "../services/operations/authAPI";
import { useState } from 'react';
import Input from '../component/Input'
import { LoginFields } from '../utils/input'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowRight } from "react-icons/fa";

export default function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData)
      dispatch(login(formData.email,formData.password,navigate))
      setFormData({
          email: "",
          password: "",
        })
    };
  
    return(
        <form  onSubmit={handleSubmit} className="w-full md:w-1/2 py-10 px-5 md:px-10">
        <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">Login</h1>
            <p>Enter your information to Login</p>
        </div>
      <div>
      {LoginFields.map(field => (
      <Input
        key={field.id}
        field={field}
        formData={formData}
        handleChange={handleChange}
        width={field.width}
      />
    ))}
  </div>
    <div className="flex -mx-3">
    <div className="w-full px-3 mb-5">
    <button type='submit'   className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Login NOW</button>
     </div>
     </div>
     <Link to="/sign-up">
      <div className="flex items-center justify-center gap-1 cursor-pointer underline">
      <span>Click here to Signup</span>
      <FaArrowRight/>
      </div>
      </Link>
      <Link to="/forgot-password">
      <div className="flex items-center justify-center gap-1 cursor-pointer underline">
      <span>Forget Password</span>
      <FaArrowRight/>
      </div>
      </Link> 
      </form>
    )
}
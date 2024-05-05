import { useState } from 'react';
import Input from '../component/Input'
import { inputFields } from '../utils/input'
import { sendOtp } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../slices/AuthSlice';
import toast from 'react-hot-toast';
import { FaArrowRight } from "react-icons/fa";

export default function Signup(){

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: ''
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
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords Do Not Match")
        return
      }
      const signupData = {
        ...formData
      }
    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))
    setFormData({
        firstName: "",
        lastName: "",
        userName:"",
        email: "",
        password: "",
        confirmPassword: "",
        image:"",
      })
  };

    return(
        <form  onSubmit={handleSubmit} className="w-full md:w-1/2 py-10 px-5 md:px-10">
        <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
            <p>Enter your information to register</p>
        </div>
      <div>
      {inputFields.map(field => (
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
    <button type='submit'   className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
     </div>
      </div>
      <Link to="/login">
      <div  className="flex items-center justify-center gap-1 cursor-pointer">
      <span>Click here to Login</span>
      <FaArrowRight/>
      </div>
      </Link>
     </form>
    )
}
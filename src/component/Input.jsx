import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const Input = ({ field, formData, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = field.type === 'password' ? (showPassword ? 'text' : 'password') : (field.type || 'text');

  return (
    <div key={field.id} className={`flex -mx-3`}>
      <div className="w-full px-3 mb-5">
        <label htmlFor={field.id} className="text-xs font-semibold px-1">{field.label}</label>
        <div className="flex">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
          </div>
          <input
            type={inputType}
            id={field.id}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            placeholder={field.placeholder}
          />
           {field.type === 'password' &&
             <span
             onClick={() => setShowPassword((prev) => !prev)}
             className=" z-[10] cursor-pointer"
           >
             {!showPassword ? (
               <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
             ) : (
               <AiOutlineEye fontSize={24} fill="#AFB2BF" />
             )}
           </span>
            }
        </div>
      </div>
    </div>
  );
};

export default Input;

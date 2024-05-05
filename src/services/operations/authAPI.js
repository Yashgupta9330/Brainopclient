import { toast } from "react-hot-toast"
import { setLoading, setToken, setUser } from "../../slices/AuthSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../api"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  POST_API,
} = endpoints

export function sendOtp(email, navigate){
    console.log("started")
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      let errorMessage = "Unknown Error";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
    }
  else if(error.response && error.response.data && error.response.data.errors){
    const errors = error.response.data.errors;
    if (errors && Array.isArray(errors) && errors.length > 0){
      errorMessage = ` ${errors[0]}`;
    }
  }
  toast.error(`Could Not Send OTP: ${errorMessage}`);
  }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  firstName,
  lastName,
  userName,
  email,
  password,
  confirmPassword,
  otp,
  image,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
        image,
        otp,
      })
      console.log(image)
      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      let errorMessage = "Unknown Error";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      else if(error.response && error.response.data && error.response.data.errors){
        const errors = error.response.data.errors;
        if (errors && Array.isArray(errors) && errors.length > 0){
          errorMessage = ` ${errors[0]}`;
        }
      }
      toast.error(`Signup Failed: ${errorMessage}`);
      navigate("/sign-up")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
  }


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      let errorMessage = "Unknown Error";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      else if(error.response && error.response.data && error.response.data.errors){
        const errors = error.response.data.errors;
        if (errors && Array.isArray(errors) && errors.length > 0){
          errorMessage = ` ${errors[0]}`;
        }
      }
      toast.error(`Login Failed: ${errorMessage}`);
      navigate("/login")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/login")
  }
}



export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...")
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      let errorMessage = "Unknown Error";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      else if(error.response && error.response.data && error.response.data.errors){
        const errors = error.response.data.errors;
        if (errors && Array.isArray(errors) && errors.length > 0){
          errorMessage = ` ${errors[0]}`;
        }
      }
      toast.error(`Failed to send email: ${errorMessage}`);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...")
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      let errorMessage = "Unknown Error";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      else if(error.response && error.response.data && error.response.data.errors){
        const errors = error.response.data.errors;
        if (errors && Array.isArray(errors) && errors.length > 0){
          errorMessage = ` ${errors[0]}`;
        }
      }
      toast.error(`Unable to reset password: ${errorMessage}`);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
}



export function getPost(token,setPosts,page) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", POST_API,{page}, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET POST RESPONSE....", response.data.data.posts);
      setPosts(response.data.data.posts);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Fetched post successfully");
    } 
    catch (error) {
      console.log("Fetched Post Error", error);
      let errorMessage = "Unknown Error";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
          errorMessage = ` ${errors[0]}`;
        }
      }
      toast.error(`Failed to Fetch Post: ${errorMessage}`);
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

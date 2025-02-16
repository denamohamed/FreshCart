import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { userContext } from '../../Context/user.context'
import { Helmet } from 'react-helmet'

export default function Login() {
  let navigate = useNavigate()
  let {token, setToken}=useContext(userContext)
  let passwordRegax = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  let validate= yup.object({
    email:yup.string().required("Email is required").email("Invalid Email"),
    password:yup.string().required("Password is required").matches(passwordRegax,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character")    
  })
  async function sendDataToLogin(values){
    let id;
    try{
       id=toast.loading("Waiting..")
      let {data} = await axios.request({
        method: "POST",
        url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
        data:values
      })
      toast.dismiss(id)
      console.log(data) 
      setTimeout(()=> {     
      if(data.message == "success"){
        setToken(data.token)
        localStorage.setItem("token" , data.token)
        navigate("/")
      }},2000) 
    }catch(errors){
      toast.error(errors.response.data.message)
      toast.dismiss(id)
    }
  }

  let formik = useFormik({
    initialValues:{
      "email":"",
      "password":""
    },
    validationSchema: validate,
    onSubmit:sendDataToLogin,
  })

  function handleForgotPassword () {
    toast.loading("Redirecting...", { duration: 3000 });
    setTimeout(() => {
      navigate('/auth/forgetpassword');
    }, 3000);  
  }

  return (
    <>
    <Helmet>
      <title>
        Login
      </title>
    </Helmet>
      <section className='flex justify-center items-center'>
        <div className='w-4/5'>
          <h1 className='text-primary text-2xl font-bold'>
            <i className='fa-regular fa-circle-user pe-1'></i>
            Login Now</h1>
          <form onSubmit={formik.handleSubmit}>
            <div>
            <input className='form-control my-2 w-full'
             type='text' 
             placeholder='Enter your Email'
             name='email'
             value={formik.values.email}
             onChange={formik.handleChange} 
             onBlur={formik.handleBlur}
             />
            {formik.errors.email && formik.touched.email ?
            (<p className='text-red-500 p-2'>{formik.errors.email}</p>):("")}
            </div>
            <div>
            <input className='form-control my-2 w-full' 
            type='password' 
            placeholder='Enter your Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ?
            (<p className='text-red-500 p-2'>{formik.errors.password}</p>):("")}
            </div>
            <button className="btn-primary my-2 border-0" type='submit'>LogIn</button>
            <button
            type='button'
            className='btn-primary bg-red-600 border-0 ms-3'
            onClick={handleForgotPassword}
           >
            Forget Password?
          </button>
          </form>
        </div>
      </section>
    </>
  )
}


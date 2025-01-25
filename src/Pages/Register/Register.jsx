import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Register() {
  const navigate = useNavigate()
  let phoneRegax = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  let passwordRegax = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

  let validate = yup.object({
    name: yup.string()
      .required("name is required")
      .min(3, "name must be more than 3 charcters")
      .max(25, "name must be less than 25 charcters"),
    phone: yup.string()
      .required("phone is required")
      .matches(phoneRegax, "invalid phone number"),
    email: yup.string()
      .required("email is required")
      .email("invalid email"),
    password: yup.string()
      .required("password is required")
      .matches(passwordRegax, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword: yup.string()
      .required("repassword is required")
      .oneOf([yup.ref("password")], "repassword don't match with password")
  })

  let formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": ""
    },
    validationSchema: validate,
    onSubmit: sendDataToRegister,
  })
  console.log(formik)

  async function sendDataToRegister(values) {
    let id;
    try {
      id = toast.loading('Waiting...')
      let { data } = await axios.request({
        method: "POST",
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data: values,
      })
      toast.dismiss(id)
      toast.success("Account created successfully")
      setTimeout(()=>{      
        if(data.message == "success"){
        navigate("/auth/login",2000);
      }
})
      
    }
    catch (error) {
      toast.dismiss(id)
      toast.error(error.response.data.message)
      toast.error(error.response.data.errors.msg)
    }
  }

  return (
    <>
    <Helmet>
      <title>
        Register
      </title>
    </Helmet>
      <section className='flex justify-center items-center'>
        <div className='w-4/5'>
          <h1 className='text-2xl text-primary font-bold'>
            <i className='fa-regular fa-circle-user pe-1'></i>
            Register Now
          </h1 >
          <form className='' onSubmit={formik.handleSubmit}>
            <div>
              <input className="form-control w-full my-2"
                type="text" placeholder='Enter your name'
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ?
                (<p className='text-red-500 font-semibold mt-2 ms-2'>{formik.errors.name}</p>)
                : ("")
              }
            </div>
            <div>
              <input className="form-control w-full my-2"
                type="tel" placeholder='Enter your phone'
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ?
                (<p className='text-red-500 font-semibold mt-2 ms-2'>{formik.errors.phone}</p>)
                : ("")
              }

            </div>
            <div>
              <input className="form-control w-full my-2"
                type="email" placeholder='Enter your e-mail'
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email && formik.errors.email ?
                (<p className='text-red-500 font-semibold mt-2 ms-2'>{formik.errors.email}</p>)
                : ("")
              }

            </div>
            <div>
              <input className="form-control w-full my-2"
                type="password" placeholder='Enter your password'
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password && formik.errors.password ?
                (<p className='text-red-500 font-semibold mt-2 ms-2'>{formik.errors.password}</p>)
                : ("")
              }

            </div>
            <div>
              <input className="form-control w-full my-2"
                type="password" placeholder='Enter the repassword'
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rePassword && formik.errors.rePassword ?
                (<p className='text-red-500 font-semibold mb-3 mt-2 ms-2'>{formik.errors.rePassword}</p>)
                : ("")
              }

            </div>
            <button className='btn-primary my-2' type='submit'>Sign in</button>
          </form>
        </div>
      </section>
    </>
  )
}

import React, { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/user.context";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  let passwordRegax = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      newPassword: Yup.string()
        .required("New password is required")
        .matches(
          passwordRegax,
          "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
        ),
    }),
    onSubmit: async (values) => {
      let id;
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          method: "POST",
          data: {
            email: values.email,
            newPassword: values.newPassword,
          },
        };

        id = toast.loading("Resetting password...");

        const { data } = await axios.request(options);

        toast.dismiss(id);
        toast.success("Password reset successfully");

        if (data.message === "success") {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      } catch (error) {
        toast.dismiss(id);
        toast.error(
          error.response?.data?.message || "Error resetting password"
        );
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="container">
        <h2 className="text-2xl text-primary font-bold my-5">Reset Password</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <input
            type="email"
            className="form-control w-full"
            placeholder="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-600 font-semibold mt-2">
              {formik.errors.email}
            </div>
          ) : null}
          <input
            type="password"
            className="form-control w-full"
            placeholder="Enter new password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="text-red-600 font-semibold mt-2">
              {formik.errors.newPassword}
            </div>
          ) : null}
          <button type="submit" className="btn-primary mt-3">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}

import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export default function SignIn(props) {

   const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
    validateField(name, value);
  }

  async function validateField(fieldName, value) {
    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    } catch (error) {
      setErrors(prevErrors => ({ ...prevErrors, [fieldName]: error.message }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); 
    try {
      await schema.validate(userData, { abortEarly: false });
      setErrors({});
      await check(userData);
    } catch (validationErrors) {
      const errorsObj = {};
      validationErrors.inner.forEach(error => {
        errorsObj[error.path] = error.message;
      });
      setErrors(errorsObj);
      setLoading(false);
    }
  }

  async function check(values) {
    try {
      const { data } = await Axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      if (data.message === "success") {
      localStorage.setItem("usertoken" , data.token)
      props.userdatatoken()
        navigate('/home');
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      setErrors({ message: err.response.data.message });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='w-75 mx-auto'>
      

    <h1>Log In </h1>
      <form onSubmit={handleSubmit}>
        {errors.message && <p className='alert alert-danger bold'>{errors.message}</p>}
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} className='form-control' type="email" name="email" id="email" />
        {errors.email && <p className="alert alert-danger m-1">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} className='form-control' type="password" name="password" id="password" />
        {errors.password && <p className="alert alert-danger m-1">{errors.password}</p>}
        <button type="submit" className='btn btn-primary m-2' disabled={loading}>
          {loading ? <i className='fas fa-spinner fa-spin' /> : "Register"}
        </button>
      </form>



    </div>
  )
}

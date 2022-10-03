import React from 'react';
import { useState, useEffect } from "react";
import { MantineProvider, Text, Button, Stack } from "@mantine/core";
import { theme } from "./theme";
import { useForm } from "react-hook-form";
import "./App.css"

export default function App() {
  const initialValues= {username:"", gender:"" , email:"" , phone:"" , password:""};
  const [userdata, setUserData]=useState(initialValues);
  const [formErrors, setFormErrors]=useState({});
  const[isSubmit,setIsSubmit]=useState(false);
  const { register, formState: { errors } } = useForm();

  const handleChange= (e) => {
    const {name,value}= e.target;
    setUserData({...userdata, [name]:value});  
  };

  const handleSubmit= (e)=>{
      e.preventDefault();
      setFormErrors(validate(userdata));
      setIsSubmit(true);
  };

  useEffect( ()=>{
      if(Object.keys(formErrors).length=== 0 && isSubmit){
      console.log(userdata);
  } }, [formErrors]);
  
  const validate = (values) =>{
      const errors = {};
      const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username){
          errors.username="User Name is Required!";
      }
      if(!values.gender){
        errors.gender="Gender is Required!";
      }
      if (!values.email){
          errors.email="Email is Required!";
      }
      else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }

      if (!values.phone){
          errors.phone="Phone is Required!";
      }else if(!values.phone.length==10 ){
        errors.phone="Phone Number should be 10 characters";
      }

      if (!values.password){
        errors.password="Password is Required!";
    }else if(values.password.length<4){
        errors.password="Password should be more than 4 characters!";

    }
      return errors;
  };

 
  return (
    <MantineProvider>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider">
        <div className="ui form">
          <div className="field">
            <label>Username:     </label>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              value={userdata.username} 
              onChange={handleChange}

            />

          </div>
          <p>{formErrors.username}</p>

          <div className="field">
            <label>Gender:          </label>
            <select  {...register("gender", { required: 'Gender is required' })}               
              name="gender"
              placeholder="Gender"
              value={userdata.gender}
              onChange={handleChange}
               >
          {/*<select {...register("category")}>*/}
             <option value="">Select...</option>
                <option value="A">Female</option>
                <option value="B">Male</option>
         </select>
            </div>
            <p>{formErrors.gender}</p>
            
          <div className="field">
            <label>Email:         </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={userdata.email} 
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>

          <div className="field">
            <label>Password:     </label>
            <input
                type="text"
                name="password"
              placeholder="Password"
              value={userdata.password} 
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>

          <div className="field">
            <label>Phone Number: </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone starts with 05xxxxxxxx"
              value={userdata.phone} 
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phone}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
        </div>
      </form>
    </div>
    


    </MantineProvider>
  );
}

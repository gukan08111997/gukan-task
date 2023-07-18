import React from "react";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

const fruits = [
    { value: "Apple", label: "Apple" },
    { value: "Banana", label: "Banana" },
    { value: "Orange", label: "Orange" },
    { value: "Kiwi", label: "Kiwi" }
  ];

export default function App() {
    const {
      register,
      handleSubmit,
      watch,
      getValues,
      control,
      formState: { errors }
    } = useForm();
  
    const onSubmit = (data) => {
      console.log(data);
    };
  
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
          <label>Name</label>
          <input type="text" name="name" {...register("name",{required:"Name field is required."})} />
          {errors.name && <p className="errorMsg">{errors.name.message}</p>}
          <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              {...register("mobile", {
                required: "Mobile number is required.",
                pattern:{value:/^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: "Mobile number format +91-0123456789"} 
              })}
            />
            {errors.mobile && <p className="errorMsg">{errors.mobile.message}</p>}
          <label>Email</label>
          <input
            type="text"
            name="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid."
              }
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
            id="password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 9,
                maxLength:9
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className="errorMsg">Password is required.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorMsg">
                Password should contain only 9 characters with 1 special characters,4 numbers,2 caps, 2 small case.
              </p>
            )}
          </div>
          <div className="form-control">
            <label>Re-enter password</label>
            <input
             id="password"
             type="password"
             {...register("password_repeat", { required: true })}
             />
            {watch("password_repeat") !== watch("password") &&
            getValues("password_repeat") ? (
              <p className="errorMsg">password not match</p>
            ) : null}
          </div>
          <div className="form-control">
          <label>Select Fruit of Interest</label>
          <Controller
            name="fruit"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} isMulti options={fruits} />
            )}
          />
          {errors.fruit && (
            <p className="errorMsg">This is a required field.</p>
          )}
        </div>
        <Form.Group className="mb-3" controlId="fruits">
          <Form.Label>Select Your tasty fruits with checkboxes</Form.Label>
          <Form.Check
            type="checkbox"
            label="Apple"
            value="Apple"
            {...register("fruits", {
              required: "Please select at-least one fruit"
            })}
          />
          <Form.Check
            type="checkbox"
            label="Banana"
            value="Banana"
            {...register("fruits")}
          />
          <Form.Check
            type="checkbox"
            label="Orange"
            value="Orange"
            {...register("fruits")}
          />
          {errors.fruits && <p className="errorMsg">{errors.fruits.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="selection">
          <Form.Label>Selection with radio button</Form.Label>
          <Form.Check
            type="radio"
            label="Selected"
            value="Selected"
            {...register("selection", {
              required: "Please select your opinion"
            })}
          />
          <Form.Check
            type="radio"
            label="Not selected"
            value="Not-selected"
            {...register("selection")}
          />
          {errors.selection && <p className="errorMsg">{errors.selection.message}</p>}
        </Form.Group>
          <div className="form-control">
            <label></label>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
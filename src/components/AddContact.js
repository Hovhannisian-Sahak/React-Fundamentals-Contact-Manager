import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const initialValues = {
  firstName: "",
  email: "",
};
export default function AddContact({ onEnter }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setFormErrors(validate(values));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // onAdd(values);
      onEnter(values.firstName, values.email);
      navigate("contactlist");
    }
  }, [formErrors]);

  const validate = (formValue) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formValue.firstName) {
      errors.firstName = "username is required";
    }

    if (!formValue.email) {
      errors.email = "email is required";
    } else if (!regex.test(formValue.email)) {
      errors.email = "this is not a valid format";
    }
    return errors;
  };
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-red-700">{formErrors.firstName}</p>
          <label>firstName</label>
          <input
            className="border-2 border-black px-2 mx-2"
            onChange={handleChange}
            type="text"
            name="firstName"
            value={values.firstName}
            placeholder="firstName"
          />
        </div>
        <div className="my-2">
          <p className="text-red-700">{formErrors.email}</p>
          <label>Email</label>
          <input
            className="border-2 border-black px-2 mx-2"
            onChange={handleChange}
            type="text"
            name="email"
            value={values.email}
            placeholder="email"
          />
        </div>

        <Button primary>Add</Button>
      </form>
    </div>
  );
}

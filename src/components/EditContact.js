import React, { useState, useEffect } from "react";

import Button from "./Button";

export default function EditContact({ contact, onSubmit }) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTitle({ ...title, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setFormErrors(validate(title));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onSubmit(contact.id, title.name, title.email);
    }
  }, [formErrors]);

  const validate = (formValue) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formValue.name) {
      errors.name = "username is required";
    }

    if (!formValue.email) {
      errors.email = "email is required";
    } else if (!regex.test(formValue.email)) {
      errors.email = "this is not a valid format";
    }
    return errors;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-red-600">{formErrors.name}</p>
          <label>firstName</label>
          <input
            className="border-2 border-black px-2 mx-2"
            onChange={handleChange}
            type="text"
            name="name"
            value={title.name}
            placeholder="firstName"
          />
        </div>
        <div className="my-1">
          <p className="text-red-600">{formErrors.email}</p>
          <label>Email</label>
          <input
            className="border-2 border-black px-2 mx-2"
            onChange={handleChange}
            type="text"
            name="email"
            value={title.email}
            placeholder="email"
          />
        </div>

        <Button primary>Update</Button>
      </form>
    </div>
  );
}

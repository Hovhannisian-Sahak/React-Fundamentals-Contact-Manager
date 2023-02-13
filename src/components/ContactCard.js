import React, { useState } from "react";
import Button from "./Button";
import { GoTrashcan, GoPencil } from "react-icons/go";

import EditContact from "./EditContact";
import { useNavigate } from "react-router-dom";
export default function ContactCard({ contact, onDelete, onEdit }) {
  let navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const { id, name, email } = contact;
  const handleDelete = () => {
    onDelete(id);
  };
  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleDetails = () => {
    const { id, name, email } = contact;
    navigate("./edituser", {
      state: {
        id,
        name,
        email,
      },
    });
  };
  const handleSubmit = (id, newName, newEmail) => {
    setShowEdit(false);
    onEdit(id, newName, newEmail);
  };
  let content = (
    <h3>
      <span className="font-bold px-2 italic">holder:</span>
      {name}
    </h3>
  );
  if (showEdit) {
    content = <EditContact onSubmit={handleSubmit} contact={contact} />;
  }

  return (
    <div className="border-2 border-black w-1/2 my-1">
      <div className="flex justify-center pt-4">
        <div className="cursor-pointer flex	" onClick={handleDetails}>
          <div className="border-2 border-black p-1 rounded-md">{name}</div>
          <div className="border-2 border-black p-1 mx-1 rounded-md">
            {email}
          </div>
        </div>
        <div className="items-center">
          <Button primary onClick={handleDelete}>
            <GoTrashcan />
          </Button>
          {/* <Link to={{ pathname: "/edit", state: { name, email } }}> */}
          <Button secondary onClick={handleEdit}>
            <GoPencil />
          </Button>
        </div>
      </div>
      <div className="p-2">{content}</div>
      {/* </Link> */}
    </div>
  );
}

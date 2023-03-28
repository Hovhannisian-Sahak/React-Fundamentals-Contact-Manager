import React from "react";

import { useNavigate } from "react-router-dom";
import Button from "./Button";
import FetchUsers from "./fetchUsers";

const ContactDetail = () => {
  let navigate = useNavigate();

  return (
    <div>
      <div className="m-4">
        <Button success onClick={() => navigate("/contactList")}>
          Back to contacts
        </Button>
      </div>

      <>
        <FetchUsers />
      </>
    </div>
  );
};
export default ContactDetail;

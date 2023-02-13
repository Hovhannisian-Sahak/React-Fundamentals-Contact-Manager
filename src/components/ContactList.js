import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import Button from "./Button";
import { GoSearch } from "react-icons/go";
export default function ContactList({
  contacts,
  onDelete,
  onEdit,
  term,
  searchKeyword,
}) {
  const inputEl = useRef("");
  const renderedContacts = contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    );
  });
  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };
  return (
    <div className="p-4 ">
      <div className="flex">
        <div>
          <Link to="/">
            <Button success>Add New Contact</Button>
          </Link>
        </div>
        <div className="flex">
          <div className="mx-2">
            <input
              ref={inputEl}
              value={term}
              onChange={getSearchTerm}
              className="border-2 border-black px-2 "
              placeholder="Search..."
            />
          </div>
          <div className="mt-1">
            <GoSearch />
          </div>
        </div>
      </div>
      {renderedContacts.length > 0
        ? renderedContacts
        : " No contacts available"}
    </div>
  );
}

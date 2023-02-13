/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import AddContact from "./components/AddContact";
import ContactDetail from "./components/ContactDetail";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const getContact = async () => {
      const res = await axios.get(
        "http://localhost:3003/contacts?_limit=7&_page=1"
      );

      setContacts(res.data);
    };
    getContact();
  }, []);

  const editContact = async (id, newName, newEmail) => {
    const res = await axios.put(`http://localhost:3003/contacts/${id}`, {
      name: newName,
      email: newEmail,
    });
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, ...res.data };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  const createContact = async (name, email) => {
    const res = await axios.post("http://localhost:3003/contacts", {
      name,
      email,
    });

    const updatedContacts = [...contacts, res.data];

    setContacts(updatedContacts);
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:3003/contacts/${id}`);

    const updatedContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(updatedContacts);
  };
  const handleSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="contactList"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                onDelete={deleteContact}
                onEdit={editContact}
                term={searchTerm}
                searchKeyword={handleSearchTerm}
              />
            }
          ></Route>
          <Route
            path="/"
            exact
            element={<AddContact onEnter={createContact} />}
          />
          <Route path="/contactlist/edituser" element={<ContactDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

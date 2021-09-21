import * as React from "react";

import * as apiClient from "./apiClient";

const Contacts = () => {
  const [contacts, setContacts] = React.useState([]);
  const [isAdding, setIsAdding] = React.useState(false);

  const loadContacts = () => apiClient.getContacts().then(setContacts);
  React.useEffect(() => {
    loadContacts();
  }, []);
  const addContacts = (contact) =>
    apiClient.addContact(contact).then(loadContacts).then(setIsAdding(false));

  return (
    <section>
      <ContactsList contacts={contacts} addContacts={addContacts} />
    </section>
  );
};

const ContactsList = ({ contacts, addContacts }) => {
  const [showForm, updateShowForm] = React.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    // if (canAdd) {
    // AddContacts(contacts);
    updateShowForm(!showForm);
    console.log("This button works!");
    //   setContacts("");
    // }
  };
  return (
    <>
      <h1>Contacts</h1>
      <h6>♡The Techtonica Twelve♡</h6>
      {contacts.map(({ name, email, phone, notes, image_url }) => (
        <ul>
          <img src={image_url} alt={contacts.name} />
          <li>{name}</li> <li>{email}</li> <li>{phone}</li> <li>{notes}</li>
        </ul>
      ))}
      <button onClick={onSubmit}>Add Contact</button>
      {showForm ? <h1>This is where the form will be</h1> : null}
    </>
  );
};

const AddContacts = ({ AddContacts }) => {
  const [contacts, setContacts] = React.useState("");

  const canAdd = contacts !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      AddContacts(contacts);
      setContacts("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        New task:{" "}
        <input
          onChange={(e) => setContacts(e.currentTarget.value)}
          value={contacts}
        />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Contacts;

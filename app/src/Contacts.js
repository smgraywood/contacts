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
      <ContactsList contacts={contacts} />
    </section>
  );
};

const ContactsList = ({ contacts }) => (
  <>
    <ul>
      {contacts.map(({ name, email, phone, notes }) => (
        <li>
          {name} | {email} | {phone} | {notes}
        </li>
      ))}
    </ul>
    <img src={contacts.image_url} alt={contacts.name} />
  </>
);

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

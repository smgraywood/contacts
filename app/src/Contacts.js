import * as React from "react";

import * as apiClient from "./apiClient";

const Contacts = () => {
  const [contacts, setContacts] = React.useState([]);
  const [isAdding, setIsAdding] = React.useState(false);

  const loadContacts = async () => setContacts(await apiClient.getContacts());
  const addContact = (contact) =>
    apiClient.addContact(contact).then(loadContacts).then(setIsAdding(false));

  React.useEffect(() => {
    loadContacts();
  }, []);

  return <section>"hi"</section>;
};

export default Contacts;

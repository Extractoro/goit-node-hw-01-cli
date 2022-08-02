const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("db/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const res = data.find((user) => user.id === contactId);
    if (!res) {
      return null;
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const res = data.findIndex((user) => user.id === contactId);
  if (res === -1) {
    return null;
  }
  const [remove] = data.splice(res, 1);
  await updateContacts(data);
  return remove;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const contact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  data.push(contact);
  await updateContacts(data);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

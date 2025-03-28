import ContactCollection from '../models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findOne({ _id: id });

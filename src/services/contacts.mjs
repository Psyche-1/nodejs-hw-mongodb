import ContactCollection from '../models/Contact.mjs';

export const getContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findOne({ _id: id });

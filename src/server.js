import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { getContactById, getContacts } from './services/contacts.js';

const PORT = getEnvVar('PORT', 3000);

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await getContacts();
    res.status(200).json({
      status: 200,
      message: `Successfully found contacts!`,
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);

    if (!data) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

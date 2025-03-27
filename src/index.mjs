import { initMongoConnection } from './db/initMongoConnection.mjs';
import { setupServer } from './server.mjs';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();

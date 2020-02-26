/**
 * Hapi server config
 */
const CatboxMemory = require('@hapi/catbox-memory');
export const serverConfig = {
  port: 3333,
  cache: [
    {
      name: 'stocks_cache',
      provider: {
        constructor: CatboxMemory
      }
    }
  ],
  host: 'localhost',
  routes: {
    cors: true
  }
};

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { serverConfig } from '../src/app/config/server-config';
import { FetchStocks } from './app/model/fetch-stocks';
import { cacheConfig } from '../src/app/config/cache-config';

const Hapi = require('@hapi/hapi');
const init = async () => {
  const server = Hapi.server(serverConfig);
  server.method('fetchStocks', FetchStocks.fetchQuotes, cacheConfig);
  server.route({
    method: 'GET',
    path: '/getQuotes/{period}/{symbol}',
    handler: async (request, h) => {
      const { symbol, period } = request.params;
      const { value, cached } = await server.methods.fetchStocks(
        symbol,
        period
      );
      const lastModified = cached ? new Date(cached.stored) : new Date();
      return h
        .response(value)
        .header('Last-modified', lastModified.toUTCString());
    }
  });
  await server
    .start()
    .then(() => {
      console.log('Server running at:', server.info.uri);
    })
    .catch(error => {
      console.log('Server failed to start', error);
    });
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();

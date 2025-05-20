const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const plugins = require('./plugins');
const config = require('./config');
const connectDB = require('./config/database');

const init = async () => {
  // Connect to MongoDB
  await connectDB();

  const server = Hapi.server({
    port: config.port,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Content-Type'],
        additionalHeaders: ['X-Requested-With']
      }
    }
  });

  // Register plugins
  await server.register(plugins);

  // Register routes
  server.route(routes);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init(); 
const fastify = require('fastify')({ logger: true });
require('dotenv/config')

const PORT = process.env.PORT || 5000;

fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.DB_CONNECTION
});

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

fastify.register(require('./routes/items'));

(async () => {
  try {
    await fastify.listen(PORT)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
})()

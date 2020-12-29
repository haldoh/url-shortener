const cryptoRandomString = require('crypto-random-string');

const fastify = require('fastify')({ logger: true });
fastify.register(require('fastify-routes'));

const itemValidation = { // Define validation
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      required: [
        'url',
      ],
      properties: {
        url: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          short: { type: 'string' },
          url: { type: 'string' },
        },
      },
    },
  },
};

const stack = {};

// @Routes
fastify.get('/getUrls', (request, reply) => {
  reply.send(stack);
});

fastify.post('/addUrl', itemValidation, (request, reply) => {
  const { url } = request.body;
  const short = cryptoRandomString({ length: 10, type: 'alphanumeric' });
  // stack.push({ short, url });
  stack[short] = url;
  reply.send(stack);
});

fastify.get('/:shortId', (request, reply) => {
  const { shortId } = request.params;
  reply.redirect(stack[shortId]);
});

module.exports = () => fastify.listen(5000, (err) => {
  console.log(fastify.routes); // Log all registered routes
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('Server running, navigate to  https://localhost:5000');
  }
});

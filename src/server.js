const redis = require('redis');
const cryptoRandomString = require('crypto-random-string');

const fastify = require('fastify')({ logger: true });
fastify.register(require('fastify-routes'));

const { logRequest } = require('./logUtils');

const client = redis.createClient();
const reqLogs = {};

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

// @Routes
fastify.post('/addUrl', itemValidation, async (request, reply) => {
  const { url } = request.body;
  const short = cryptoRandomString({ length: 10, type: 'alphanumeric' });
  await client.set(short, url);
  // stack[short] = url;
  const result = {};
  result[short] = await client.get(short);
  reply.send(result);
});

fastify.get('/:shortId/logs', async (request, reply) => {
  const { shortId } = request.params;
  console.log(reqLogs);
  reply.send(reqLogs[shortId]);
});

fastify.get('/:shortId', async (request, reply) => {
  const { shortId } = request.params;
  if (!Object.prototype.hasOwnProperty.call(reqLogs, shortId)) {
    reqLogs[shortId] = [];
  }
  reqLogs[shortId].push(logRequest(request));
  reply.redirect(await client.get(shortId));
});

module.exports = () => fastify.listen(5000, async (err) => {
  await client.connect();
  console.log(fastify.routes); // Log all registered routes
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('Server running, navigate to  https://localhost:5000');
  }
});

const fieldsToExtract = [
  'query', 'body', 'params', 'headers', 'ip', 'ips', 'hostname', 'protocol', 'method', 'url'
]

const logRequest = (req) => {
  const result = {};
  result.reqTime = Date.now();
  fieldsToExtract.forEach( (field) => {
    result[field] = req[field];
  });
  return result;
};

module.exports = {
  logRequest,
};

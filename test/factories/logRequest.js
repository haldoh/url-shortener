const reqFactory = () => {
  return {
    "query": "some query",
    "body": "some body",
    "params": {
      "param": "value"
    },
    "headers": {
      "header": "value"
    },
    "ip": "1.2.3.4",
    "hostname": "hostname value",
    "protocol": "http",
    "method": "GET",
    "url": "/abc",
  }
}

module.exports = {
  reqFactory
}
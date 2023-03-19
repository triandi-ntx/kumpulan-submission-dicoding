class ClientError extends Error {
  constructor(msg, code = 400) {
    super(msg);

    this.code = code;
    this.name = 'ClientError';
  }
}

module.exports = ClientError;

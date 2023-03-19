const autoBind = require('auto-bind-es5');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUserHandler(req, h) {
    this._validator.validateUserPayload(req.payload);

    const userId = await this._service.addUser(req.payload);
    const res = h.response({
      status: 'success',
      data: {
        userId,
      },
    }).code(201);

    return res;
  }
}

module.exports = UsersHandler;

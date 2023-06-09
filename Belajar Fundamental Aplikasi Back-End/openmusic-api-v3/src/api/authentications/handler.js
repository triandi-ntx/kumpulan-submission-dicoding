const autoBind = require('auto-bind-es5');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    autoBind(this);
  }

  async postAuthenticationHandler(req, h) {
    this._validator.validatePostAuthenticationPayload(req.payload);

    const { username, password } = req.payload;
    const id = await this._usersService.verifyUserCredential(username, password);
    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authenticationsService.addRefreshToken(refreshToken);

    const res = h.response({
      status: 'success',
      message: 'Authentication has been successfully added',
      data: {
        accessToken, refreshToken,
      },
    }).code(201);

    return res;
  }

  async putAuthenticationHandler(req) {
    this._validator.validatePutAuthenticationPayload(req.payload);

    const { refreshToken } = req.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);

    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = this._tokenManager.generateAccessToken({ id });

    return {
      status: 'success',
      message: 'Access token has been successfully updated',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(req) {
    this._validator.validateDeleteAuthenticationPayload(req.payload);

    const { refreshToken } = req.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token has been successfully deleted',
    };
  }
}

module.exports = AuthenticationsHandler;

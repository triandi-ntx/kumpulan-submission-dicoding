const autoBind = require('auto-bind-es5');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(req, h) {
    this._validator.validateAlbumPayload(req.payload);

    const albumId = await this._service.addAlbum(req.payload);
    const res = h.response({
      status: 'success',
      data: {
        albumId,
      },
    }).code(201);

    return res;
  }

  async getAlbumHandler(req) {
    const { id } = req.params;
    const album = await this._service.getAlbumById(id);

    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumHandler(req) {
    this._validator.validateAlbumPayload(req.payload);

    const { id } = req.params;

    await this._service.updateAlbumById(id, req.payload);

    return {
      status: 'success',
      message: 'Album has been successfully updated',
    };
  }

  async deleteAlbumHandler(req) {
    const { id } = req.params;

    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album has been successfully deleted',
    };
  }
}

module.exports = AlbumsHandler;

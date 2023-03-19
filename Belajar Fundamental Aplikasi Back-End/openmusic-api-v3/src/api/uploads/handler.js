const autoBind = require('auto-bind-es5');

class UploadsHandler {
  constructor(storageService, albumsService, validator) {
    this._storageService = storageService;
    this._albumsService = albumsService;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadCoverHandler(req, h) {
    const { cover } = req.payload;
    const { id } = req.params;

    this._validator.validateCoverHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/uploads/covers/${filename}`;

    await this._albumsService.addAlbumCoverById(id, coverUrl);

    const response = h.response({
      status: 'success',
      message: 'Cover has been successfully uploaded',
    }).code(201);

    return response;
  }
}

module.exports = UploadsHandler;

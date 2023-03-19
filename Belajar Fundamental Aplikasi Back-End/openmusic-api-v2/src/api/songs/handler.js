const autoBind = require('auto-bind-es5');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(req, h) {
    this._validator.validateSongPayload(req.payload);

    const songId = await this._service.addSong(req.payload);
    const res = h.response({
      status: 'success',
      data: {
        songId,
      },
    }).code(201);

    return res;
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs();

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongHandler(req) {
    const { id } = req.params;
    const song = await this._service.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongHandler(req) {
    this._validator.validateSongPayload(req.payload);

    const { id } = req.params;

    await this._service.updateSongById(id, req.payload);

    return {
      status: 'success',
      message: 'Song has been successfully updated',
    };
  }

  async deleteSongHandler(req) {
    const { id } = req.params;

    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Song has benn successfully updated',
    };
  }
}

module.exports = SongsHandler;

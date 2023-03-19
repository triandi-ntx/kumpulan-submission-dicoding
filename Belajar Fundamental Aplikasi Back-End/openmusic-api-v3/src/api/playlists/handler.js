const autoBind = require('auto-bind-es5');

class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(req, h) {
    this._validator.validatePlaylistPayload(req.payload);

    const { name } = req.payload;
    const { id: owner } = req.auth.credentials;
    const playlistId = await this._service.addPlaylist(name, owner);

    const res = h.response({
      status: 'success',
      data: {
        playlistId,
      },
    }).code(201);

    return res;
  }

  async getPlaylistsHandler(req) {
    const { id: owner } = req.auth.credentials;
    const playlists = await this._service.getPlaylists(owner);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistHandler(req) {
    const { id } = req.params;
    const { id: owner } = req.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist has been successfully deleted',
    };
  }
}

module.exports = PlaylistsHandler;

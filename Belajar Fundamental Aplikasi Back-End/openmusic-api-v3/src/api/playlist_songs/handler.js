const autoBind = require('auto-bind-es5');

class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, songsService, usersService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._usersService = usersService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongHandler(req, h) {
    this._validator.validatePlaylistSongPayload(req.payload);

    const { id: playlistId } = req.params;
    const { id: owner } = req.auth.credentials;
    const { songId } = req.payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);
    await this._songsService.verifyExistingSongById(songId);
    await this._playlistSongsService.addSong(playlistId, songId);

    const res = h.response({
      status: 'success',
      message: 'Song has been added to the playlist',
    }).code(201);

    return res;
  }

  async getPlaylistSongsHandler(req) {
    const { id: playlistId } = req.params;
    const { id: owner } = req.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);

    const playlist = await this._playlistsService.getPlaylistById(playlistId);

    const songs = await this._playlistSongsService.getSongs(playlistId);
    const username = await this._usersService.getUsernameById(owner);

    return {
      status: 'success',
      data: {
        playlist: {
          ...playlist,
          username,
          songs,
        },
      },
    };
  }

  async deletePlaylistSongHandler(req) {
    const { id: playlistId } = req.params;
    const { id: owner } = req.auth.credentials;
    const { songId } = req.payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);
    await this._playlistSongsService.deleteSong(playlistId, songId);

    return {
      status: 'success',
      message: 'Song has been successfully deleted from playlist',
    };
  }
}

module.exports = PlaylistSongsHandler;

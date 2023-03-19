const autoBind = require('auto-bind-es5');

class UserAlbumLikesHandler {
  constructor(userAlbumLikesService, albumsService) {
    this._userAlbumLikesService = userAlbumLikesService;
    this._albumsService = albumsService;

    autoBind(this);
  }

  async postLikeHandler(req, h) {
    const { id } = req.params;
    const { id: credentialId } = req.auth.credentials;

    await this._albumsService.verifyExistingAlbumById(id);

    const isLiked = await this._userAlbumLikesService.verifyUserAlbumLike(
      credentialId,
      id,
    );

    if (!isLiked) {
      await this._userAlbumLikesService.addLike(credentialId, id);

      const res = h.response({
        status: 'success',
        message: 'Album has been successfully liked',
      }).code(201);

      return res;
    }

    await this._userAlbumLikesService.deleteLike(credentialId, id);

    const res = h.response({
      status: 'success',
      message: 'Unliked album has been successfully',
    }).code(201);

    return res;
  }

  async getLikesHandler(req, h) {
    const { id } = req.params;
    const { number, source } = await this._userAlbumLikesService.getLikesByAlbumId(id);

    const res = h.response({
      status: 'success',
      data: {
        likes: number,
      },
    }).header('X-Data-Source', source).code(200);

    return res;
  }
}

module.exports = UserAlbumLikesHandler;

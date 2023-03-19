class Listener {
  constructor(playlistSongsService, playlistsService, mailSender) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString(),
      );

      const { id, name } = await this._playlistsService.getPlaylistById(
        playlistId,
      );
      const songs = await this._playlistSongsService.getSongs(
        playlistId,
      );

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify({
          playlist: {
            id,
            name,
            songs,
          },
        }),
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;

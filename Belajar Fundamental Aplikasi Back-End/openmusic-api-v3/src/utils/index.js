const mapSongDbToModel = ({
  id, title, year, genre, performer, duration, album_id,
}) => ({
  id, title, year, genre, performer, duration, albumId: album_id,
});

const mapAlbumDbToModel = ({
  id, name, year, cover,
}) => ({
  id, name, year, coverUrl: cover,
});

module.exports = { mapSongDbToModel, mapAlbumDbToModel };

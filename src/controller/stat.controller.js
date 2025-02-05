import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { user } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    // const totalSongs = await song.countDocuments();
    // const totalUsers = await user.countDocuments();
    // const totalAlbums = await Album.countDocuments();

    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        user.countDocuments(),

        song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};

"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong, setFullScreen } from "@/redux/features/playerSlice";
import { BsPlayFill } from "react-icons/bs";
import SongListSkeleton from "./SongListSkeleton";
import { BiHeadphone } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { toast } from "react-hot-toast";
import { addSongToPlaylist, deleteSongFromPlaylist, getUserPlaylists } from "@/services/playlistApi";
import { getSongData } from "@/services/dataAPI"; // Ensure pagination is used from this API

const SongsList = ({
  SongData,
  loading,
  hidePlays,
  isUserPlaylist,
  playlistID,
  setSongs,
}) => {
  const { activeSong } = useSelector((state) => state.player);
  const [showMenu, setShowMenu] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // Tracking the current page
  const [songs, setSongsData] = useState(SongData); // Initial song data

  const dispatch = useDispatch();

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await getUserPlaylists();
      if (res?.success === true) {
        setPlaylists(res?.data?.playlists);
      }
    };
    getPlaylists();
  }, []);

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data: SongData, i: index }));
    dispatch(setFullScreen(true));
    dispatch(playPause(true));
  };

  // Function to load more songs based on pagination
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    const res = await getSongData(nextPage, 10); // Pass page and limit
    if (res?.data) {
      setSongsData((prevSongs) => [...prevSongs, ...res.data]);  // Appending new songs to the list
      setCurrentPage(nextPage);
    } else {
      toast.error("No more songs available.");
    }
  };

  // Add song to playlist
  const handleAddToPlaylist = async (song, playlistID) => {
    setShowMenu(false);
    const res = await addSongToPlaylist(playlistID, song);
    if (res?.success) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  // Delete song from playlist
  const handleDeleteFromPlaylist = async (playlistID, song) => {
    setShowMenu(false);
    const res = await deleteSongFromPlaylist(playlistID, song);
    if (res?.success) {
      setSongs((prev) => prev.filter((s) => s?.id?.toString() !== song.toString()));
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <>
      <div className="mt-5">
        {!loading && songs?.length > 0 ? (
          songs?.map((song, index) => (
            <div
              key={song?.id}
              onClick={() => {
                handlePlayClick(song, index);
              }}
              className={`flex items-center mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between ${
                activeSong?.id === song?.id && " text-[#00e6e6]"
              }`}
            >
              <div className="flex items-center">
                <BsPlayFill className="text-2xl" />
                <p className="ml-4">{song?.title}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleAddToPlaylist(song, playlistID)}
                  className="mr-2"
                >
                  Add to Playlist
                </button>
                <button
                  onClick={() => handleDeleteFromPlaylist(playlistID, song)}
                  className="mr-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <SongListSkeleton />
        )}
      </div>
      {songs?.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="w-full py-2 mt-4 text-center bg-gray-800 text-white rounded-full"
        >
          View More
        </button>
      )}
    </>
  );
};

export default SongsList;

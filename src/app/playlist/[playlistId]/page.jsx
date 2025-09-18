import PlayButton from "@/components/PlayButton";
import SongList from "@/components/SongsList";
import { getplaylistData } from "@/services/dataAPI";

const page = async ({ params }) => {
  let playlistData = [];
  try {
    // Fetch the playlist data
    playlistData = await getplaylistData(params.playlistId);
    if (!playlistData || playlistData.length === 0) {
      playlistData = [];  // Ensure fallback if no data is returned
    }
    console.log('Fetched Playlist Data:', playlistData);  // Debugging the fetched data
  } catch (error) {
    console.log("Error fetching playlist data:", error);
    playlistData = [];  // Fallback in case of error
  }

  // Check if the playlist data has songs and handle rendering
  const songs = playlistData?.songs || [];

  return (
    <div className="w-11/12 m-auto mt-16">
      <div className="flex flex-col lg:flex-row items-center">
        {songs.length === 0 ? (
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex rounded-full items-center justify-center w-[300px] h-[300px] bg-gray-300 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center">
            <h2 className="text-2xl font-bold">{playlistData?.name}</h2>
            <SongList SongData={songs} loading={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

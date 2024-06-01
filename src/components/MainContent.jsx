import useSpotifyData from "../api/useSpotifyData";
import LeftSidebar from "./LeftSide";
import RightSidebar from "./RightSide";
import Card from "./Card";
import MusicPlayer from "../components/MusicPlayer";
import { useState } from "react";
import Good from "./Good";

function MainContent({ token }) {
  const topMixes = useSpotifyData(
    "https://api.spotify.com/v1/browse/categories/toplists/playlists",
    token
  );
  const madeForYou = useSpotifyData(
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
    token
  );
  const recentlyPlayed = useSpotifyData(
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists",
    token
  );
  const jumpBackIn = useSpotifyData(
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists",
    token
  );
  const uniquelyYours = useSpotifyData(
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists",
    token
  );
  const [currentTrack, setCurrentTrack] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex-1 bg-gray-800 text-white p-4">
        <header className="flex justify-between items-center mb-8">
          <Good />
        </header>
        <Section
          title="Your top mixes"
          data={topMixes}
          setCurrentTrack={setCurrentTrack}
          expanded={expandedSections["Your top mixes"]}
          toggleSection={() => toggleSection("Your top mixes")}
        />
        <Section
          title="Made for you"
          data={madeForYou}
          setCurrentTrack={setCurrentTrack}
          expanded={expandedSections["Made for you"]}
          toggleSection={() => toggleSection("Made for you")}
        />
        <Section
          title="Recently played"
          data={recentlyPlayed}
          setCurrentTrack={setCurrentTrack}
          expanded={expandedSections["Recently played"]}
          toggleSection={() => toggleSection("Recently played")}
        />
        <Section
          title="Jump back in"
          data={jumpBackIn}
          setCurrentTrack={setCurrentTrack}
          expanded={expandedSections["Jump back in"]}
          toggleSection={() => toggleSection("Jump back in")}
        />
        <Section
          title="Uniquely yours"
          data={uniquelyYours}
          setCurrentTrack={setCurrentTrack}
          expanded={expandedSections["Uniquely yours"]}
          toggleSection={() => toggleSection("Uniquely yours")}
        />
      </div>
      <RightSidebar />
      <MusicPlayer currentTrack={currentTrack} />
    </div>
  );
}

function Section({ title, data, setCurrentTrack, expanded, toggleSection }) {
  const displayCount = expanded ? 10 : 4;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <button
          className="text-sm text-[#ADADAD] hover:underline"
          onClick={toggleSection}
        >
          {expanded ? "Show Less" : "See All"}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {data &&
          data.playlists.items
            .slice(0, displayCount)
            .map((item, index) => (
              <Card
                key={`${item.id}-${index}`}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.images[0].url}
                setCurrentTrack={setCurrentTrack}
              />
            ))}
      </div>
    </section>
  );
}
export default MainContent;

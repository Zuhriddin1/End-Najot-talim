import { FaHome, FaSearch, FaBook, FaPlus, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
const LeftSidebar = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-black p-4">
        <div className="mb-6">
          <h1 className="text-gray-500 font-bold mb-4">HOME</h1>
          <ul>
            <Link to={"/"}>
              <li className="mb-4">
                <div className="flex items-center text-gray-300 hover:text-white">
                  <FaHome className="w-6 h-6 mr-3" />
                  <span>Home</span>
                </div>
              </li>
            </Link>
            <li className="mb-4">
              <div className="flex items-center text-gray-300 hover:text-white">
                <FaSearch className="w-6 h-6 mr-3" />
                <span>Search</span>
              </div>
            </li>
            <li className="mb-4">
              <div className="flex items-center text-gray-300 hover:text-white">
                <FaBook className="w-6 h-6 mr-3" />
                <span>Your Library</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <button className="flex items-center text-gray-300 hover:text-white w-full mb-4">
            <FaPlus className="w-6 h-6 mr-3" />
            <span>Create Playlist</span>
          </button>
          <button className="flex items-center text-gray-300 hover:text-white w-full">
            <FaHeart className="w-6 h-6 mr-3 text-purple-500" />
            <Link to="/likes" className="text-white">
              <span>Liked Songs</span>
            </Link>
          </button>
        </div>
        <ul>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Chill Mix</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Insta Hits</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Your Top Songs 2021</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Mellow Songs</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Anime Lofi & Chillhop Music</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>BG Afro "Select" Vibes</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Afro "Select" Vibes</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Happy Hits!</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Deep Focus</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Instrumental Study</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>OST Compilations</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Nostalgia for old souled mill...</Link>
            </div>
          </li>
          <li className="mb-4">
            <div className="text-gray-300 hover:text-white">
              <Link to={"/"}>Mixed Feelings</Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default LeftSidebar;

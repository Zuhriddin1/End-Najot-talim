import { FaUserAlt, FaCog } from "react-icons/fa";
const RightSide = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Friend Activity</h2>
        <FaCog className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
      </div>
      <p className="text-sm mb-6">
        Let friends and followers on Spotify see what you're listening to.
      </p>
      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="relative">
              <FaUserAlt className="w-8 h-8 text-gray-500" />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-700 h-4 rounded-full mb-2 w-3/4"></div>
              <div className="bg-gray-700 h-4 rounded-full w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs mb-6">
        Go to Settings &gt; Social and enable "Share my listening activity on
        Spotify." You can turn this off at any time.
      </p>
      <button className="bg-white text-black font-bold py-2 px-4 rounded-full w-full">
        SETTINGS
      </button>
    </div>
  );
};

export default RightSide;

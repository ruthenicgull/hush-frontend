import { Link } from "react-router-dom";

const ErrorBoundary = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-white text-purple-600 px-2 text-sm rounded rotate-12 absolute -mt-20 ml-32">
          Page Not Found
        </div>
        <p className="text-white text-lg mt-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <p className="text-purple-300 text-md mt-4">
          Maybe it got lost in space.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-purple-600 rounded hover:bg-purple-700 group">
            <span className="absolute w-48 h-48 rounded bg-purple-800 opacity-10 rotate-45 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:scale-150 transition-transform duration-300"></span>
            <span className="relative">Go Home</span>
          </button>
        </Link>
        <div className="mt-12">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/103/311/653/space-nebula-astronaut-fragments-astronaut-hd-wallpaper-preview.jpg"
            alt="Lost in Space"
            className="w-80 mx-auto opacity-80 animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;

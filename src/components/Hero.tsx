import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero min-h-[calc(100vh-96px)]">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <img
          src="images/hero.webp"
          alt="hero-img"
          className="max-w-60 md:max-w-sm mask mask-squircle shadow-2xl"
        />
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Feeling hungry?</h1>
          <p className="py-6 text-2xl">Order your favorite Pizza in minutes!</p>
          <Link
            to="/menu"
            className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-full 
             bg-zinc-900/40 border border-white/10 backdrop-blur-md
             transition-all duration-300 ease-out
             hover:bg-zinc-800 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <span className="text-lg font-semibold text-zinc-300 group-hover:text-white transition-colors">
              Get Started
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-zinc-500 transition-all duration-300 
               group-hover:text-purple-400 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

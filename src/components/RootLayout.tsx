import { Outlet } from "react-router";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#05050a] text-white overflow-hidden selection:bg-fuchsia-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-30%] right-[-20%] 
                     w-[70vw] h-[70vh] rounded-full 
                     bg-fuchsia-600/40 mix-blend-screen 
                     blur-[250px] md:blur-[350px]"
        />
        <div
          className="absolute top-[-20%] left-[-25%] 
                     w-[60vw] h-[60vh] rounded-full 
                     bg-cyan-500/30 mix-blend-screen 
                     blur-[250px] md:blur-[350px]"
        />
        <div
          className="absolute top-[10%] left-[20%] right-[20%]
                        w-full h-[50vh]
                        bg-blue-800/20 mix-blend-screen
                        blur-[200px]"
        />
      </div>
      <div className="relative z-10 shadow-xl shadow-black/20">
        <Header />
        <main>
          <div className="py-4">
            <section className="max-w-3xl mx-auto">
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
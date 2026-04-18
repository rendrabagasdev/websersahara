import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isSidebarOpen) return;

    const frameId = requestAnimationFrame(() => {
      setIsSidebarVisible(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [isSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSidebarVisible(false);
  }, [location.pathname]);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setTimeout(() => {
      setIsSidebarOpen(false);
    }, 220);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full h-24 px-4 sm:px-6 flex items-center">
        <div className="flex-1 flex justify-start">
          <button className="p-2" aria-label="Open menu" onClick={openSidebar}>
            <img
              src="/icon/menu.svg"
              alt="menu icon"
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
            />
          </button>
        </div>

        <div className="shrink-0 flex justify-center">
          <img
            src="/logo/logo-sersahara-hitam.png"
            alt="sersahara logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>
      </header>

      {isSidebarOpen ? (
        <div
          className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-200 ${
            isSidebarVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeSidebar}
          aria-hidden="true"
        >
          <aside
            className={`absolute left-0 top-0 bottom-0 w-[82%] max-w-90 rounded-r-[36px] bg-white px-8 py-10 shadow-2xl transition-transform duration-200 ease-out ${
              isSidebarVisible ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-14 flex justify-center">
              <img
                src="/logo/logo-sersahara-hitam.png"
                alt="sersahara logo"
                className="h-14 w-auto object-contain"
              />
            </div>

            <nav className="flex flex-col gap-8">
              <Link
                to="/"
                className="group flex items-center gap-5 text-[16px] font-semibold uppercase leading-none text-black"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-black transition-transform duration-200 group-hover:scale-105"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5L12 3l9 7.5" />
                  <path d="M6.5 10v10h11V10" />
                </svg>
                <span>Home</span>
              </Link>
              <Link
                to="/katalog"
                className="group flex items-center gap-5 text-[16px] font-semibold uppercase leading-none text-black"
              >
                <img
                  src="/icon/cart.svg"
                  alt="merchandise"
                  className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <span>Merchandise</span>
              </Link>

              <Link
                to="/katalog"
                className="group flex items-center gap-5 text-[16px] font-semibold uppercase leading-none text-black"
              >
                <img
                  src="/icon/tentang.svg"
                  alt="tentang sersahara"
                  className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <span>Tentang Sersahara</span>
              </Link>
            </nav>
          </aside>
        </div>
      ) : null}

      {/* Area Konten Utama */}
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
    </div>
  );
}

import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="w-full h-screen overflow-hidden relative bg-black flex flex-col items-center">
      {/* 1. Background Layer - Di gambar terlihat ada gradasi hitam di bawahnya */}
      <div
        id="bg-img"
        className="absolute -top-23 left-0 right-0 z-0 h-[90%]  w-full"
      >
        <img
          src="artboard.png"
          alt="Background"
          className="w-full h-full object-cover object-top opacity-70"
        />
        {/* Efek Gradient Gelap di bawah agar tombol lebih terbaca */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/95 to-black"></div>
      </div>

      {/* 2. Logo Container - Jika logo sudah ada di background, div ini mungkin tidak perlu. 
          Tapi jika ini logo overlay, kita beri jarak yang pas. */}
      <div
        id="logo"
        className="relative z-20 pt-24 md:pt-40 w-full flex justify-center"
      >
        <img
          src="logo/logo-sersahara.png"
          alt="Logo"
          className="w-10/12 md:w-1/2 object-contain"
        />
      </div>

      {/* 3. Button Container - Kita taruh agak ke bawah layar */}
      <div className="z-10 flex flex-col items-center justify-end flex-1 w-full gap-5 pb-40 md:pb-52">
        {/* Merchandise Button */}
        <Link
          to="/katalog"
          className="bg-[#D9D9D9] w-11/12 md:w-[328px] h-[63px] rounded-[14.44px] flex items-center relative active:scale-95 transition-transform"
        >
          {/* Icon - Tetap menggunakan absolute agar tidak merusak posisi teks */}
          <img
            src="icon/cart.svg"
            alt="cart"
            className="w-8 h-8 absolute left-6 object-contain"
          />

          {/* Teks - Mengikuti data Figma: 16px, SemiBold (600), No Letter Spacing */}
          <span className="text-black text-[16px] font-semibold uppercase w-full text-center leading-none">
            Merchandise
          </span>
        </Link>
        {/* Tentang Sersahara Button */}
        <Link
          to="/tentang-sersahara"
          className="bg-[#D9D9D9] w-11/12 md:w-[328px] h-[63px] rounded-[14.44px] flex items-center relative active:scale-95 transition-transform"
        >
          {/* Icon - Tetap menggunakan absolute agar tidak merusak posisi teks */}
          <img
            src="icon/tentang.svg"
            alt="cart"
            className="w-8 h-8 absolute left-6 object-contain"
          />

          {/* Teks - Mengikuti data Figma: 16px, SemiBold (600), No Letter Spacing */}
          <span className="text-black text-[16px] ml-10 font-semibold uppercase w-full text-center leading-none">
            Tentang Sersahara
          </span>
        </Link>
      </div>
    </main>
  );
}

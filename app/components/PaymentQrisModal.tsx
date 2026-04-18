import { useEffect, useMemo, useState } from "react";
import { Image } from "./Image";

type PaymentQrisModalProps = {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
  onFinish: () => void;
  productName: string;
  selectedSize: string;
  unitPrice: number;
};

export function PaymentQrisModal({
  isOpen,
  isVisible,
  onClose,
  onFinish,
  productName,
  selectedSize,
  unitPrice,
}: PaymentQrisModalProps) {
  const [step, setStep] = useState<"form" | "qris">("form");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isQuantityAnimating, setIsQuantityAnimating] = useState(false);
  const [quantityDirection, setQuantityDirection] = useState<"up" | "down">(
    "up",
  );

  useEffect(() => {
    if (!isOpen) {
      setStep("form");
      setQuantity(1);
      setFullName("");
      setAddress("");
      setIsQuantityAnimating(false);
      setQuantityDirection("up");
    }
  }, [isOpen]);

  useEffect(() => {
    setIsQuantityAnimating(true);

    const timeoutId = window.setTimeout(() => {
      setIsQuantityAnimating(false);
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [quantity]);

  const totalPrice = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  const formattedTotalPrice = useMemo(
    () => new Intl.NumberFormat("id-ID").format(totalPrice),
    [totalPrice],
  );

  const decreaseQuantity = () => {
    setQuantityDirection("down");
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantityDirection("up");
    setQuantity((current) => current + 1);
  };

  const proceedToQris = () => {
    setStep("qris");
  };

  const finishPayment = () => {
    onFinish();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/45 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Selesaikan pembayaran"
      onClick={onClose}
    >
      <div
        className={`w-full rounded-t-[48px] bg-[#FFFFFF] px-8 pt-10 pb-8 shadow-xl transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {step === "form" ? (
          <>
            <h2 className="text-center text-[20px] font-semibold uppercase tracking-tight text-black">
              Informasi Pemesanan
            </h2>

            <div className="mt-1 rounded-[18px] bg-white px-5 py-1">
              <div className="rounded-[14px] bg-[#FFFFFF] px-2 py-3">
                <p className="text-[14px] font-semibold uppercase text-black/70">
                  Produk: {productName}
                </p>
                <p className="mt-1 text-[14px] font-semibold uppercase text-black/70">
                  Ukuran: {selectedSize}
                </p>

                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Nama Lengkap"
                  className="mt-5 h-16 w-full rounded-2xl border-2 border-black/75 bg-transparent px-5 text-[16px] font-semibold placeholder:text-black/30"
                />

                <input
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Alamat Rumah"
                  className="mt-4 h-16 w-full rounded-2xl border-2 border-black/75 bg-transparent px-5 text-[16px] font-semibold placeholder:text-black/30"
                />

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-[16px] font-semibold uppercase text-black">
                    Jumlah Barang
                  </p>
                  <div className="flex items-center gap-5 text-black">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/25 text-[26px] font-semibold leading-none transition-transform duration-150 active:scale-90 disabled:cursor-not-allowed disabled:opacity-35"
                      aria-label="Kurangi jumlah"
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span
                      className={`min-w-8 text-center text-[20px] font-semibold leading-none transition-all duration-200 ${
                        isQuantityAnimating
                          ? quantityDirection === "up"
                            ? "-translate-y-1 scale-115"
                            : "translate-y-1 scale-115"
                          : "translate-y-0 scale-100"
                      }`}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/25 text-[26px] font-semibold leading-none transition-transform duration-150 active:scale-90"
                      aria-label="Tambah jumlah"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-9 flex items-center justify-end gap-3">
                  <p className="text-[20px] font-semibold uppercase text-black">
                    Total Harga :
                  </p>
                  <p className="text-[20px] font-semibold text-black">
                    {formattedTotalPrice}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className=" h-16 w-full rounded-3xl bg-black text-[20px] font-semibold uppercase text-white"
              onClick={proceedToQris}
            >
              Selesaikan Pembayaran
            </button>
          </>
        ) : (
          <>
            <h2 className="text-center text-[20px] font-semibold uppercase tracking-tight text-black">
              Selesaikan Pembayaran
            </h2>

            <div className="mt-1 rounded-[18px] bg-white p-5">
              <div className="rounded-[14px] bg-[#FCFCFC] px-5 py-4">
                <div className="mt-5 grid place-items-center">
                  <Image
                    src="/asset/qris.jpg"
                    alt="QRIS pembayaran"
                    className="w-full max-w-[320px] rounded-lg object-contain"
                    sizes="320px"
                  />
                </div>

                <p className="mt-3 text-center text-[12px] font-semibold text-black/70">
                  SATU QRIS UNTUK SEMUA
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-1 h-16 w-full rounded-3xl bg-black text-[20px] font-semibold uppercase text-white"
              onClick={finishPayment}
            >
              Selesai
            </button>
          </>
        )}
      </div>
    </div>
  );
}

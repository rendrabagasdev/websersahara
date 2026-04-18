type PaymentQrisModalProps = {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
};

export function PaymentQrisModal({
  isOpen,
  isVisible,
  onClose,
}: PaymentQrisModalProps) {
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
        className={`w-full rounded-t-[48px] bg-[#F1F1F1] px-8 pt-10 pb-8 shadow-xl transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-center text-[20px] font-semibold uppercase tracking-tight text-black">
          Selesaikan Pembayaran
        </h2>

        <div className="mt-8 rounded-[18px] bg-white p-5">
          <div className="rounded-[14px] bg-[#FCFCFC] px-5 py-4">
            <div className="mt-5 grid place-items-center">
              <img
                src="/asset/qris.jpg"
                alt="QRIS pembayaran"
                className="w-full max-w-[320px] rounded-lg object-contain"
              />
            </div>

            <p className="mt-3 text-center text-[12px] font-semibold text-black/70">
              SATU QRIS UNTUK SEMUA
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 h-16 w-full rounded-3xl bg-black text-[20px] font-semibold uppercase text-white"
          onClick={onClose}
        >
          Selesai
        </button>
      </div>
    </div>
  );
}

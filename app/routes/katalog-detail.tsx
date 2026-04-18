import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/katalog-detail";
import katalogData from "../data/katalog.json";
import { PaymentQrisModal } from "../components/PaymentQrisModal";
import { Image } from "../components/Image";

type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  image: string | null;
  materials: string[];
  sizes: string[];
  content: string;
};

const PRODUCTS: Product[] = katalogData;

export function meta({ params }: Route.MetaArgs) {
  const product = PRODUCTS.find((item) => item.slug === params.slug);
  const productName = product
    ? `${product.brand} ${product.name}`
    : "Produk Sersahara";

  return [
    { title: `${productName} | Sersahara Official` },
    {
      name: "description",
      content: product
        ? `${productName} di Sersahara official. ${product.content}`
        : "Detail produk merchandise resmi Sersahara.",
    },
    {
      name: "keywords",
      content: product
        ? `${productName.toLowerCase()}, merchandise sersahara, katalog sersahara, sersahara`
        : "produk sersahara, merchandise sersahara, sersahara",
    },
    { property: "og:title", content: `${productName} | Sersahara` },
    {
      property: "og:description",
      content: product
        ? `${productName} tersedia di katalog resmi Sersahara.`
        : "Produk resmi Sersahara.",
    },
    { property: "og:type", content: "product" },
  ];
}

export default function KatalogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((item) => item.slug === slug);
  const [selectedSize, setSelectedSize] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  useEffect(() => {
    if (!product || product.sizes.length === 0) return;

    setSelectedSize((currentSize) =>
      currentSize && product.sizes.includes(currentSize)
        ? currentSize
        : product.sizes[0],
    );
  }, [product]);

  useEffect(() => {
    if (!isPaymentOpen) return;

    const frameId = requestAnimationFrame(() => {
      setIsPaymentVisible(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [isPaymentOpen]);

  const openPaymentModal = () => {
    setIsPaymentOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentVisible(false);
    setTimeout(() => {
      setIsPaymentOpen(false);
    }, 260);
  };

  const finishPayment = () => {
    closePaymentModal();
    setTimeout(() => {
      navigate("/");
    }, 280);
  };

  if (!product) {
    return (
      <section className="w-full min-h-full bg-white px-8 py-8">
        <div className="mx-auto w-full max-w-md text-black">
          <h1 className="text-3xl font-semibold uppercase">
            Produk tidak ditemukan
          </h1>
          <p className="mt-3 text-lg">
            Produk yang kamu buka tidak ada di data katalog.
          </p>
          <Link
            to="/katalog"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold uppercase text-white"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-full bg-white px-10 pb-16">
      <div className="mx-auto w-full max-w-md pt-2">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            className="h-80 w-full rounded-[36px] object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 448px"
          />
        ) : (
          <div
            className="h-80 w-full rounded-[36px] bg-[#CFCFCF]"
            aria-hidden="true"
          />
        )}

        <div className="mt-12 text-black">
          <h1 className="text-[20px] font-semibold uppercase leading-none">
            {product.brand} {product.name}
          </h1>

          <p className="mt-4 text-[16px] leading-relaxed">{product.content}</p>

          <div className="mt-10">
            <h2 className="text-[16px] font-semibold uppercase leading-none">
              MATERIAL
            </h2>
            <ul className="mt-5 list-disc pl-9 text-[16px] font-medium leading-[1.35]">
              {product.materials.map((material) => (
                <li key={material}>{material}</li>
              ))}
            </ul>
          </div>

          <div className="mt-11">
            <h2 className="text-[16px] font-semibold uppercase leading-none">
              PILIH UKURAN
            </h2>
            <div className="mt-6 space-y-4">
              {product.sizes.map((size) => (
                <label
                  key={size}
                  className="flex w-full cursor-pointer items-center gap-4 text-left"
                >
                  <input
                    type="radio"
                    name="product-size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={(event) => setSelectedSize(event.target.value)}
                    className="peer sr-only"
                  />
                  <span
                    className="relative h-7 w-7 rounded-full border-2 border-black transition-all duration-200 ease-out
                    peer-checked:border-black peer-focus-visible:ring-2 peer-focus-visible:ring-black/30
                    after:absolute after:left-1/2 after:top-1/2 after:h-5 after:w-5 after:-translate-x-1/2 after:-translate-y-1/2
                    after:rounded-full after:bg-black after:opacity-0 after:scale-50 after:transition-all after:duration-200 after:ease-out
                    peer-checked:after:opacity-100 peer-checked:after:scale-100"
                    aria-hidden="true"
                  />
                  <span className="text-[16px] font-semibold uppercase leading-none">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="mt-12 flex h-16 w-full items-center justify-center gap-8 rounded-3xl bg-black text-white"
            onClick={openPaymentModal}
          >
            <span className="text-[20px] leading-none">+</span>
            <span className="text-[16px] font-semibold uppercase leading-none">
              Tambah Pesanan
            </span>
          </button>
        </div>
      </div>

      <PaymentQrisModal
        isOpen={isPaymentOpen}
        isVisible={isPaymentVisible}
        onClose={closePaymentModal}
        onFinish={finishPayment}
        productName={`${product.brand} ${product.name}`}
        selectedSize={selectedSize}
        unitPrice={product.price}
      />
    </section>
  );
}

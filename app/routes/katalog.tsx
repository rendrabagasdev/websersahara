import { Link } from "react-router";
import type { Route } from "./+types/katalog";
import katalogData from "../data/katalog.json";
import { Image } from "../components/Image";

type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  image: string | null;
  materials: string[];
  sizes: string[];
  content: string;
};

const PRODUCTS: Product[] = katalogData;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Katalog Merchandise Sersahara | Sersahara Official" },
    {
      name: "description",
      content:
        "Lihat katalog merchandise Sersahara resmi: t-shirt, running cap, mug, totebag, dan produk lainnya.",
    },
    {
      name: "keywords",
      content:
        "katalog sersahara, merchandise sersahara, t-shirt sersahara, topi sersahara, sersahara",
    },
    { property: "og:title", content: "Katalog Merchandise Sersahara" },
    {
      property: "og:description",
      content:
        "Temukan produk merchandise resmi dari Sersahara di halaman katalog.",
    },
    { property: "og:type", content: "website" },
  ];
}

export default function Katalog() {
  return (
    <section className="w-full min-h-full bg-white px-8 sm:px-10 pb-12">
      <div className="mx-auto w-full max-w-2xl pt-3 sm:pt-5">
        <h1 className="inline-block pb-1 text-[20px] leading-none font-semibold uppercase tracking-tight text-black sm:text-[44px]">
          Merch Katalog
        </h1>

        <div className="mt-12 flex flex-col gap-10 sm:mt-14 sm:gap-12">
          {PRODUCTS.map((product) => (
            <article key={product.id}>
              <Link
                to={`/katalog/${product.slug}`}
                className="grid grid-cols-[154px_1fr] items-center gap-6 transition-opacity hover:opacity-80 sm:gap-10"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                    className="h-29.5 w-38.5 rounded-[15px] object-cover shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                    sizes="154px"
                  />
                ) : (
                  <div
                    className="h-29.5 w-38.5 rounded-[15px] bg-[#CFCFCF] shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                    aria-hidden="true"
                  />
                )}

                <div className="text-black font-semibold">
                  <p className="text-[20px]  uppercase leading-tight sm:text-[34px]">
                    {product.brand}
                  </p>
                  <p className="mt-2 text-[20px] uppercase leading-tight sm:text-[34px]">
                    {product.name}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

export default function ProductItem({ product }) {
  return (
    <div className="card rounded-lg mb-5 block border border-gray-200 shadow-md">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{product.price}&euro;</p>
        <button
          className="primary-button rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500"
          type="button"
        >
          Pridėti į krepšelį
        </button>
      </div>
    </div>
  );
}

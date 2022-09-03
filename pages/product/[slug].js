import { useRouter } from 'next/router';
import Link from 'next/link';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import Image from 'next/image';
import React, { useContext } from 'react';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return <div>Nerasta</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('Atsiprašome, produkto nebeturime.');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    console.log('asd');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Atgal</Link>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            />
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-bold">{product.name}</h1>
              </li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>{product.numReviews} of 5</li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div>
            <div className="rounded-lg mb-5 block border border-gray-200 shadow-md p-5">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>{product.price}&euro;</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Statusas</div>
                <div>{product.stock > 0 ? 'Turime' : 'Neturime'}</div>
              </div>
              <button
                className="rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500 w-full"
                onClick={addToCartHandler}
              >
                Pridėti į krepšelį
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

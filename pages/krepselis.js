import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { XCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

export default function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <Layout title="Krepšelis">
      <h1 className="mb-4 text-xl">Krepšelis</h1>
      {cartItems.length === 0 ? (
        <div>
          Krepšelis tuščias. <Link href="/">Grįžti į meniu</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Pavadinimas</th>
                  <th className="p-5 text-right">Kiekis</th>
                  <th className="p-5 text-right">Kaina</th>
                  <th className="p-5">Veiksmas</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/patiekalai/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">{item.price}&euro;</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card rounded-lg mb-5 block border border-gray-200 shadow-md p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Iš viso: ( {cartItems.reduce((a, c) => a + c.quantity, 0)} ) :{' '}
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  &euro;
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('/apmokejimas')}
                  className="rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500 w-full"
                >
                  Apmokėjimas
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

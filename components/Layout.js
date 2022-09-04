import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  console.log(state);
  return (
    <>
      <Head>
        <title>
          {title ? title + ' - Šašlykinė' : 'Šašlykinė - Restoranas Alytuje'}
        </title>
        <meta
          name="description"
          content="Restoranas „Šašlykinė“. Čia galite rasti informaciją apie mūsų restoranus „Lietuviški Patiekalai“ bei „Riba“ ir užsisakyti maistą į namus."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center justify-between shadow-md px-4">
            <Link href="/">
              <a className="text-lg font-bold">„Šašlykinė“</a>
            </Link>
            <div>
              <Link href="/krepselis">
                <a className="p-2">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <span className="ml-1 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          © 2020 - {new Date().getFullYear()} Šašlykinė. Visos teisės
          saugomos.&nbsp;
          <Link href="https://rekvizitai.vz.lt/imone/v_vasiliausko_saslykine/">
            <a>Įmonės rekvizitai.&nbsp;</a>
          </Link>
          <Link href="/salygos">
            <a>Sąlygos ir taisyklės.</a>
          </Link>
        </footer>
      </div>
    </>
  );
}

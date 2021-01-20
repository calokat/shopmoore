import '../styles/globals.css'
import {useRouter} from 'next/router'
import Link from 'next/link'
function MyApp({ Component, pageProps }) {
  let nav;
  let homeLink = (useRouter().asPath !== "/") ? <><Link href="/">&larr; Go to home</Link> |</> : null;
  let addListingLink = (useRouter().asPath !== "/addListing") ? <Link href="/addListing">Add Listing</Link> : null;
  nav = (
    <nav className="text-3xl bg-black text-white text-center">
      {homeLink} {addListingLink}
    </nav>)
  return (<>
            <header className="text-5xl mt-5 ml-5">The Shopmoore</header>
            {nav}
            <Component {...pageProps} />
          </>)
}

export default MyApp

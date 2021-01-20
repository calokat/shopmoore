import '../styles/globals.css'
import {useRouter} from 'next/router'
import Link from 'next/link'
function MyApp({ Component, pageProps }) {
  let nav;
  let homeLink = (useRouter().asPath !== "/") ? <div className="border-2 border-white text-center"><Link href="/">&larr; Go to home</Link></div> : null;
  let addListingLink = (useRouter().asPath !== "/addListing") ? <div className="border-2 border-white text-center"><Link href="/addListing">Add Listing</Link></div> : null;
  nav = (
    <nav className="text-3xl bg-black text-white justify-center flex flex-col sm:flex-row sm:space-x-4 space-x-0 space-y-4 sm:space-y-0 py-1">
      {homeLink} {addListingLink}
    </nav>)
  return (<>
            <header className="text-5xl mt-5 ml-5">The Shopmoore</header>
            {nav}
            <Component {...pageProps} />
          </>)
}

export default MyApp

import '../styles/globals.css'
import {useRouter} from 'next/router'
import Link from 'next/link'
function MyApp({ Component, pageProps }) {
  let nav;
  if (useRouter().asPath !== "/") {
    nav = (
    <h1 className="text-3xl">
      <Link href="/">&larr; Go to home</Link><br />
    </h1>)
  }
  else {
    nav = null;
  }
  return (<>
            <header className="text-5xl mt-5 ml-5">The Shopmoore</header>
            {nav}
            <Component {...pageProps} />
          </>)
}

export default MyApp

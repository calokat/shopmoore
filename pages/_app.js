import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<>
            <header className="text-5xl mt-5 ml-5">The Shopmoore</header>
            <Component {...pageProps} />
          </>)
}

export default MyApp

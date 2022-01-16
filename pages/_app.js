import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning >
      {typeof window !== 'undefined' && <Component {...pageProps} />}
    </div>
  );
}

export default MyApp

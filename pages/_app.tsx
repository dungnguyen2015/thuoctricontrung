import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SEO from '../components/SEO';
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
	<>
	{/* SEO */}
      <SEO />
	  {/* Footer */}
      <Header />
      <Component {...pageProps} />
	  {/* Footer */}
      <Footer />
	  </>
	)
}
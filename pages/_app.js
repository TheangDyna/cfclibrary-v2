import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Layout from './components/containers/Layout';
import AuthGuard from './components/containers/AuthGuard';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffa31a',
      main: '#ff9900',
      dark: '#e68a00',
      contrastText: "#ffffff"
    },
  },
})

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AuthGuard>
          {router.pathname === '/' ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </AuthGuard>
      </ThemeProvider>
    </RecoilRoot>
  )
}
export default MyApp;



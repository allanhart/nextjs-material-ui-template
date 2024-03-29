import type { ReactElement, ReactNode } from 'react';
import { useCallback, useState } from 'react';

import Head from 'next/head';

import type { NextPage } from 'next';
import { AppProps } from 'next/app';

import { CacheProvider, EmotionCache } from '@emotion/react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import createEmotionCache from 'style/createEmotionCache';
import theme from 'style/theme';

import DefaultLayout from 'layout/DefaultLayout';

import AppContext, { AppContextInterface } from "AppContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode,
  pageTitle?: string,
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout,
  emotionCache?: EmotionCache;
}


export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps
  } = props;

  const [loadProgress, setLoadProgress] = useState(null);

  const updateAppContext = useCallback((context:AppContextInterface) => {
    Object.keys(context).forEach((key) => {
      const value = context[key];
      switch (key) {
        case 'loadProgress':
          setLoadProgress(value);
          break;
        default:
          throw new Error(`Unexpected context key/value pair: (${key}=${value})`);
      }
    });
  }, []);

  const getLayout = Component.getLayout ?? ((page) => (
    <DefaultLayout
      pageTitle={Component.pageTitle ?? process.env.NEXT_PUBLIC_APP_TITLE ?? 'My Application'}
    >
      {page}
    </DefaultLayout>
  ));

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppContext.Provider value={{
        loadProgress,
        update: updateAppContext,
      }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </AppContext.Provider>
    </CacheProvider>
  );
}

import { FC } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Provider } from 'react-redux';
import { setupIonicReact } from '@ionic/react';

import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';

import '../styles/globals.css';
import { wrapper } from '../store/store'

setupIonicReact({});

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  
  return (
    <Provider store={store}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>

      <Component {...props.pageProps} />
      
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
      />

      <Script
        noModule
        src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"
      />
    </Provider>
  );
}

export default App;
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/Home'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}

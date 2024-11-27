import { FC, ReactElement } from 'react';
// import dynamic from 'next/dynamic';

import Home from 'views/home';
// import Wallet from 'views/wallet';

// const Wallet = dynamic(() => import('@/views/home'), {
//     ssr: false
// });

const HomePage: FC = (): ReactElement => {
    return <Home />;
};

export default HomePage;

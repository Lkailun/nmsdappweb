import { FC, ReactElement } from 'react';

import { Header, Stake, Order } from './components';
const Main: FC = (): ReactElement => {
    return (
        <>
            <Header />
            <Order />
        </>
    );
};

export default Main;

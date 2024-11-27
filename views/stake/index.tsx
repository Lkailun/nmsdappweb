import { FC, ReactElement } from 'react';

import { Header, Stake, Order } from './components';
const Main: FC = (): ReactElement => {
    return (
        <>
            <Header />
            <Stake />
            <Order />
        </>
    );
};

export default Main;

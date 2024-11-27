import { FC, ReactElement } from 'react';
import css from './styles/index.module.scss';

import { Header, Invite, List } from './components';
const Home: FC = (): ReactElement => {
    return (
        <>
            <Header />
            <Invite />
            <List />
        </>
    );
};

export default Home;

import { FC, ReactElement } from 'react';

import { Info, Invite, List } from './components';
const Team: FC = (): ReactElement => {
    return (
        <>
            <Info />
            <Invite />
            <List />
        </>
    );
};

export default Team;

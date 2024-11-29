import { FC, ReactElement, useEffect } from 'react';
import { Header, Order } from './components';
import { useBtc } from '@/state/game/hooks';
import { useUser } from '@/state/user/hooks';

const Main: FC = (): ReactElement => {
    const [{ userinfo }] = useUser();
    const [_, { getData, clearLoopData }] = useBtc();

    useEffect(() => {
        if (userinfo.address) getData();
    }, [userinfo.address]);

    useEffect(() => {
        return () => {
            clearLoopData();
        };
    });
    return (
        <>
            <Header />
            <Order />
        </>
    );
};

export default Main;

import { FC, ReactElement, use, useEffect } from 'react';
import { Header, Order } from './components';
import { useLuck } from '@/state/game/hooks';
import { useUser } from '@/state/user/hooks';
const Main: FC = (): ReactElement => {
    const [{ userinfo }] = useUser();
    const [_, { getData, clearData }] = useLuck();

    useEffect(() => {
        if (userinfo.address) getData();
    }, [userinfo.address]);

    useEffect(() => {
        return () => {
            clearData();
        };
    }, []);
    return (
        <>
            <Header />
            <Order />
        </>
    );
};

export default Main;

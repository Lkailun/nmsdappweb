import { FC, ReactElement, useEffect, useRef } from 'react';
import { Header, Order } from './components';
import { useBtc } from '@/state/game/hooks';
import { useUser } from '@/state/user/hooks';
import { useVoice } from '@/state/base/hooks';

const Main: FC = (): ReactElement => {
    const [{ userinfo }] = useUser();
    const [_, { getData, clearData }] = useBtc();
    const [voice] = useVoice();
    const backgroundAudio = useRef<any>(null);

    useEffect(() => {
        if (userinfo.address) getData();
    }, [userinfo.address]);

    useEffect(() => {
        if (voice === 'open') {
            if (!backgroundAudio.current) {
                backgroundAudio.current = new Audio('/voice/background.mp3');
                backgroundAudio.current.loop = true;
            }
            backgroundAudio.current.play();
        } else {
            backgroundAudio.current?.pause();
        }
    }, [voice]);

    useEffect(() => {
        return () => {
            clearData();
            backgroundAudio.current.pause();
            backgroundAudio.current = null;
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

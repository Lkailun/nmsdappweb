import { FC, ReactElement, use, useEffect, useRef } from 'react';
import { Header, Order } from './components';
import { useLuck } from '@/state/game/hooks';
import { useUser } from '@/state/user/hooks';
import { useVoice } from '@/state/base/hooks';

const Main: FC = (): ReactElement => {
    const [{ userinfo }] = useUser();
    const [_, { getData, clearData }] = useLuck();
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
                backgroundAudio.current.volume = 0.4;
            }
            backgroundAudio.current.play();
        } else {
            backgroundAudio.current?.pause();
        }
    }, [voice]);

    useEffect(() => {
        return () => {
            backgroundAudio.current?.pause();
            backgroundAudio.current = null;
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

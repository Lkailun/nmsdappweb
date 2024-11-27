import { useEffect, useRef } from 'react';

function useThrottled(default_delay: number = 1500): (FN: Function, delay?: number) => void {
    const throttleSwitch = useRef<boolean>(true);
    const throttled = (FN: Function, delay: number = default_delay): void => {
        if (!throttleSwitch) {
            return;
        }
        throttleSwitch.current = false;
        FN && FN();
        setTimeout(() => {
            throttleSwitch.current = true;
        }, delay);
    };

    useEffect(() => {
        return () => {
            throttleSwitch.current = true;
        };
    }, []);

    return throttled;
}

export default useThrottled;

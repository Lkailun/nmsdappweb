import { useSelector } from 'react-redux';
import { useCallback, useRef } from 'react';
import { setBindInviteTipModal, setBindModal, setFirstScreen, setMaxProcessTime, setNoticeModal, setProcessModal, setProcessTime, setWithdrawAleoModal } from './actions';
import { AppState, useAppDispatch } from '../index';

export function useBindModal(): [boolean, (open: boolean) => void] {
    const dispatch = useAppDispatch();
    const showBindModal = useSelector<AppState, AppState['base']['showBindModal']>((state: AppState) => state.base.showBindModal);
    const handBindModal = useCallback(
        (open: boolean) => {
            dispatch(setBindModal(open));
        },
        [dispatch]
    );
    return [showBindModal, handBindModal];
}

export function useNoticeModal(): [boolean, (open: boolean) => void] {
    const dispatch = useAppDispatch();
    const showNoticeModal = useSelector<AppState, AppState['base']['showNoticeModal']>((state: AppState) => state.base.showNoticeModal);
    const handNoticeModal = useCallback(
        (open: boolean) => {
            dispatch(setNoticeModal(open));
        },
        [dispatch]
    );
    return [showNoticeModal, handNoticeModal];
}

export function useBindInviteTipModal(): [boolean, (open: boolean) => void] {
    const dispatch = useAppDispatch();
    const showBindInviteTipModal = useSelector<AppState, AppState['base']['showBindInviteTipModal']>((state: AppState) => state.base.showBindInviteTipModal);
    const handBindInviteTipModal = useCallback(
        (open: boolean) => {
            dispatch(setBindInviteTipModal(open));
        },
        [dispatch]
    );
    return [showBindInviteTipModal, handBindInviteTipModal];
}

export function useFirstScreen(): [boolean, (flag: boolean) => void] {
    const dispatch = useAppDispatch();
    const firstScreen = useSelector<AppState, AppState['base']['firstScreen']>((state: AppState) => state.base.firstScreen);
    const handFirstScreen = useCallback(
        (flag: boolean) => {
            dispatch(setFirstScreen(flag));
        },
        [dispatch]
    );
    return [firstScreen, handFirstScreen];
}

export function useProcessModal(): [{ showProcessModal: boolean; time: number; maxProcessTime: number }, { handProcessModal: (open: boolean) => void; handMaxProcessTime: (time: number) => void; handProcess: () => void }] {
    const dispatch = useAppDispatch();
    const timer = useRef<any>(null);
    const showProcessModal = useSelector<AppState, AppState['base']['showProcessModal']>((state: AppState) => state.base.showProcessModal);
    const processTime = useSelector<AppState, AppState['base']['processTime']>((state: AppState) => state.base.processTime);
    const maxProcessTime = useSelector<AppState, AppState['base']['maxProcessTime']>((state: AppState) => state.base.maxProcessTime);

    const handProcessModal = useCallback(
        (open: boolean) => {
            if (!open) {
                clearInterval(timer.current);
            }
            dispatch(setProcessModal(open));
            // if (open) handProcess();
        },
        [dispatch]
    );

    const handMaxProcessTime = useCallback(
        (time: number) => {
            dispatch(setProcessTime(time));
            dispatch(setMaxProcessTime(time));
        },
        [dispatch]
    );

    const handProcess = useCallback(() => {
        let process_time = maxProcessTime;
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            process_time -= 1;
            dispatch(setProcessTime(process_time));
            if (process_time <= 0) {
                clearInterval(timer.current);
                process_time = 0;
            }
        }, 1000);
    }, [maxProcessTime]);
    return [
        { time: processTime, showProcessModal, maxProcessTime },
        { handProcessModal, handMaxProcessTime, handProcess }
    ];
}

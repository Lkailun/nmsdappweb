import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render shows the fallback UI
        console.error('getDerivedStateFromError::::', error);

        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // Log the error to an error reporting service console
        console.error('Error caught by Error Boundary:', error, errorInfo);
    }

    render() {
        // console.log('this.state', this.state);
        // console.log('this.props', this.props);
        if ((this.state as any).hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return (this.props as any).children;
    }
}

export default ErrorBoundary;

// import { Component, PropsWithChildren, ReactNode } from 'react';
// import { useBlockNumber } from 'wagmi';

// export class ErrorBoundary extends Component<PropsWithChildren<{ fallback?: ((error: Error) => ReactNode) | ReactNode }>, { error: Error | undefined }> {
//     constructor(props: any) {
//         super(props);
//         this.state = { error: undefined };
//     }
//     // const { data, error } = useBlockNumber();

//     // static getDerivedStateFromError(error: any) {
//     //     // Update state so the next render will show the fallback UI.
//     //     console.error('getDerivedStateFromError:::', error);

//     //     return { error };
//     // }

//     // componentDidCatch(error: any, errorInfo: any) {
//     //     console.error('componentDidCatch:::', error, errorInfo);
//     // }

//     // useEffect(() => {
//     //     console.log('-----error', error);
//     // }, [error]);

//     // if (error?.name === 'HttpRequestError') {
//     //     const { status } = error;

//     //     return <div>A HTTP error occurred. Status: {status}</div>;
//     // }
//     // if (error?.name === 'LimitExceededRpcError') {
//     //     const { code } = error;

//     //     return <div>Rate limit exceeded. Code: {code}</div>;
//     // }

//     render() {
//         if (this.state.error) {
//             // You can render any custom fallback UI
//             if (typeof this.props.fallback === 'function') return this.props.fallback(this.state.error);
//             return this.props.fallback || <h1>Something went wrong.</h1>;
//         }

//         return this.props.children;
//     }
// }

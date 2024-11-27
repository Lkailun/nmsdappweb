import React, { SVGAttributes } from 'react';
import Svg, { SvgProps } from './Svg';

export const IconCopy: React.FC<SvgProps> = (props) => {
    return (
        <Svg {...props} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.2197 14.5247V3.9386C16.2197 3.28905 15.693 2.76242 15.0434 2.76242H4.4577C3.80815 2.76242 3.28149 3.28905 3.28149 3.9386V14.5247C3.28149 15.1737 3.80815 15.7009 4.4577 15.7009H15.0434C15.693 15.7009 16.2197 15.1737 16.2197 14.5247ZM13.8673 14.5247H5.6339C4.98435 14.5247 4.4577 13.9975 4.4577 13.3485V5.1148C4.4577 4.46525 4.98435 3.9386 5.6339 3.9386H13.8673C14.5168 3.9386 15.0434 4.46523 15.0434 5.1148V13.3485C15.0434 13.9975 14.5168 14.5247 13.8673 14.5247ZM18.572 6.29101H17.3959V7.46721C18.0454 7.46721 18.572 7.99386 18.572 8.64367V16.8771C18.572 17.5261 18.0454 18.0533 17.3959 18.0533H9.16246C8.51291 18.0533 7.98626 17.5261 7.98626 16.8771H6.81006V18.0533C6.81006 18.7023 7.33671 19.2295 7.98626 19.2295H18.572C19.2216 19.2295 19.7483 18.7023 19.7483 18.0533V7.46721C19.7483 6.81764 19.2216 6.29101 18.572 6.29101Z"
                fill="currentColor"
            />
        </Svg>
    );
};
export const IconWarning: React.FC<SvgProps> = (props) => {
    return (
        <Svg {...props} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_13_55)">
                <path
                    d="M6 12C2.6865 12 0 9.3135 0 6C0 2.6865 2.6865 0 6 0C9.3135 0 12 2.6865 12 6C12 9.3135 9.3135 12 6 12ZM6 11C8.7615 11 11 8.7615 11 6C11 3.2385 8.7615 1 6 1C3.2385 1 1 3.2385 1 6C1 8.7615 3.2385 11 6 11ZM5.5 5.5C5.5 5.36739 5.55268 5.24021 5.64645 5.14645C5.74021 5.05268 5.86739 5 6 5C6.13261 5 6.25978 5.05268 6.35355 5.14645C6.44732 5.24021 6.5 5.36739 6.5 5.5V9C6.5 9.13261 6.44732 9.25978 6.35355 9.35355C6.25978 9.44732 6.13261 9.5 6 9.5C5.86739 9.5 5.74021 9.44732 5.64645 9.35355C5.55268 9.25978 5.5 9.13261 5.5 9V5.5ZM5.95 3.9C5.76435 3.9 5.5863 3.82625 5.45503 3.69497C5.32375 3.5637 5.25 3.38565 5.25 3.2C5.25 3.01435 5.32375 2.8363 5.45503 2.70503C5.5863 2.57375 5.76435 2.5 5.95 2.5C6.13565 2.5 6.3137 2.57375 6.44497 2.70503C6.57625 2.8363 6.65 3.01435 6.65 3.2C6.65 3.38565 6.57625 3.5637 6.44497 3.69497C6.3137 3.82625 6.13565 3.9 5.95 3.9Z"
                    fill="currentColor"
                    fillOpacity="0.4"
                />
            </g>
            <defs>
                <clipPath id="clip0_13_55">
                    <rect width="12" height="12" fill="white" />
                </clipPath>
            </defs>
        </Svg>
    );
};

export const IconError: React.FC<SvgProps> = (props) => {
    return (
        <Svg {...props} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
            <path d="M20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 20L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};

export const IconSuccess: React.FC<SvgProps> = (props) => {
    return (
        <Svg {...props} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 13L14.1666 20L10.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};
export const IconCancel: React.FC<SvgProps> = (props) => {
    return (
        <Svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M7 7L17 17M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};

export const IconPre: React.FC<SvgProps> = (props) => {
    return (
        <Svg {...props} viewBox="0 0 66 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Extra-Large" transform="translate(-794.000000, -3791.000000)" strokeWidth="2">
                    <g id="编组-6备份" transform="translate(827.000000, 3803.000000) scale(-1, 1) translate(-827.000000, -3803.000000) translate(794.000000, 3792.000000)">
                        <line x1="0" y1="11" x2="66" y2="11" id="路径-85" stroke="currentColor"></line>
                        <path d="M53,0 C55.6666667,7.33333333 60,11 66,11" id="路径-86" stroke="currentColor"></path>
                        <path d="M53,11 C55.6666667,18.3333333 60,22 66,22" id="路径-86备份" stroke="currentColor" transform="translate(59.500000, 16.500000) scale(1, -1) translate(-59.500000, -16.500000) "></path>
                    </g>
                </g>
            </g>
        </Svg>
    );
};
export const IconNext: React.FC<SvgProps> = (props) => {
    return (
        <Svg {...props} viewBox="0 0 66 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Extra-Large" transform="translate(-1114.000000, -3791.000000)" stroke="currentColor" strokeWidth="2">
                    <g id="编组-6" transform="translate(1114.000000, 3792.000000)">
                        <line x1="0" y1="11" x2="66" y2="11" id="路径-85"></line>
                        <path d="M53,0 C55.6666667,7.33333333 60,11 66,11" id="路径-86"></path>
                        <path d="M53,11 C55.6666667,18.3333333 60,22 66,22" id="路径-86备份" transform="translate(59.500000, 16.500000) scale(1, -1) translate(-59.500000, -16.500000) "></path>
                    </g>
                </g>
            </g>
        </Svg>
    );
};
export const IconMenu: React.FC<SvgProps> = (props) => {
    return (
        <Svg {...props} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="iPhone-14-Pro" transform="translate(-362.000000, -12.000000)" fill="currentColor" fillRule="nonzero">
                    <g id="更多" transform="translate(362.000000, 12.000000)">
                        <rect id="矩形" opacity="0" x="0" y="0" width="16" height="16"></rect>
                        <path
                            d="M1.03889063,3.30909375 L14.9610937,3.30909375 C15.4017031,3.30909375 15.7576563,2.96160938 15.7576563,2.53332812 C15.7576563,2.10525 15.4019062,1.75757812 14.9610937,1.75757812 L1.03890625,1.75757812 C0.599109375,1.75757812 0.24234375,2.10504688 0.24234375,2.53332812 C0.24234375,2.96160938 0.599109375,3.30909375 1.03890625,3.30909375 L1.03889063,3.30909375 Z M14.9609219,7.187875 L1.038875,7.187875 C0.5980625,7.187875 0.2423125,7.53535937 0.2423125,7.96364063 C0.2423125,8.39192188 0.5980625,8.73939063 1.038875,8.73939063 L14.9610937,8.73939063 C15.4017031,8.73939063 15.7576563,8.39192188 15.7576563,7.96364063 C15.7574531,7.53535937 15.3994844,7.187875 14.9608906,7.187875 L14.9609219,7.187875 Z M14.9609219,12.6822188 L1.038875,12.6822188 C0.59928125,12.6822188 0.2423125,13.0297031 0.2423125,13.4579844 C0.2423125,13.8862656 0.599078125,14.2337344 1.038875,14.2337344 L14.9610937,14.2337344 C15.4017031,14.2337344 15.7576563,13.8862656 15.7576563,13.4579844 C15.7574531,13.0299062 15.4017031,12.6822188 14.9608906,12.6822188 L14.9609219,12.6822188 Z"
                            id="形状"
                        ></path>
                    </g>
                </g>
            </g>
        </Svg>
    );
};

export const IconClose: React.FC<SvgProps> = (props) => {
    return (
        <Svg {...props} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="iPhone-14-Pro备份" transform="translate(-362.000000, -12.000000)" fill="currentColor">
                    <g id="编组-8备份" transform="translate(362.000000, 12.000000)">
                        <rect id="矩形" opacity="0" x="0" y="0" width="16" height="16"></rect>
                        <g id="编组-6" transform="translate(2.000000, 2.000000)">
                            <path
                                d="M-0.599663291,5.05719096 L12.5996633,5.05719096 C13.1203623,5.05719096 13.5424723,5.47930094 13.5424723,6 C13.5424723,6.52069906 13.1203623,6.94280904 12.5996633,6.94280904 L-0.599663291,6.94280904 C-1.12036235,6.94280904 -1.54247233,6.52069906 -1.54247233,6 C-1.54247233,5.47930094 -1.12036235,5.05719096 -0.599663291,5.05719096 Z"
                                id="矩形"
                                transform="translate(6.000000, 6.000000) rotate(-45.000000) translate(-6.000000, -6.000000) "
                            ></path>
                            <path
                                d="M-0.599663291,5.05719096 L12.5996633,5.05719096 C13.1203623,5.05719096 13.5424723,5.47930094 13.5424723,6 C13.5424723,6.52069906 13.1203623,6.94280904 12.5996633,6.94280904 L-0.599663291,6.94280904 C-1.12036235,6.94280904 -1.54247233,6.52069906 -1.54247233,6 C-1.54247233,5.47930094 -1.12036235,5.05719096 -0.599663291,5.05719096 Z"
                                id="矩形"
                                transform="translate(6.000000, 6.000000) rotate(-315.000000) translate(-6.000000, -6.000000) "
                            ></path>
                        </g>
                    </g>
                </g>
            </g>
        </Svg>
    );
};

'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef } from 'react';

import { makeRequest } from '@/app/events/6030-spring-doins/cloud-example';
// import Iframe from 'react-iframe';
import { Clover } from '@/lib/clover.sdk';
import { CloverConfig } from '@/lib/config';

// const elements = clover.elements();
const styles = {
    body: { fontFamily: 'Roboto, Open Sans, sans-serif', fontSize: '16px' },
    input: { fontSize: '20px' },
};

const PaymentForm = () => {
    // const renderRef = useRef(0);
    //
    // const clover: null | {
    //     elements: () => {
    //         create: (
    //             str: string,
    //             stls: typeof styles,
    //         ) => {
    //             mount: (str: string) => void;
    //             addEventListener: (str: string, cb: (event: any) => void) => void;
    //             removeEventListener: (str: string, cb: (event: any) => void) => void;
    //         };
    //     };
    // } = useMemo(
    //     () =>
    //         typeof window === 'undefined'
    //             ? null
    //             : new Clover(CloverConfig.apiAccessKey, { merchantId: CloverConfig.merchantId }),
    //     [],
    // );
    //
    // useEffect(() => {
    //     if (renderRef.current > 0) return;
    //     renderRef.current++;
    //
    //     const elements = clover?.elements();
    // }, [clover]);

    return (
        <form action="/charge" method="post" id="payment-form">
            <button type="button" onClick={() => makeRequest()}>
                TEST IT
            </button>
        </form>
    );
};

export default dynamic(() => Promise.resolve(PaymentForm), { ssr: false });

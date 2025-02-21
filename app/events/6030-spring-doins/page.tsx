'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useCallback } from 'react';

import { Button } from '@/components/button';
import { Heading, Paragraph, Subheading } from '@/components/heading';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

// import Iframe from 'react-iframe';
// import PaymentForm from './components/form';

const SpringDoins6030 = () => {
    const handleCTA = useCallback(() => {
        // ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <PageWrapper>
            <PageSection>
                <div className="flex flex-col max-w-3xl mx-auto gap-8">
                    <Heading>
                        Lord Sholto Douglas Chapter 3 ECV <br />
                        Returns to Foresthill
                    </Heading>
                    <Subheading>Spring Doins 6030</Subheading>

                    <div className="flex justify-center">
                        <Button onClick={handleCTA}>Pay your rub!</Button>
                    </div>

                    <Image
                        priority
                        src="/images/flyers/spring-doins-6030.jpg"
                        alt="Spring Doin Flyer"
                        width={0}
                        height={0}
                        className="w-full mx-auto"
                    />
                </div>
            </PageSection>

            <PageSection>
                <div className="flex flex-col max-w-3xl mx-auto gap-8">
                    <Subheading>Time & Location</Subheading>

                    <div>
                        <Paragraph>April 25-27, 2025 C.Y. 6030</Paragraph>
                        <Paragraph>Foresthill, CA</Paragraph>
                    </div>
                </div>
            </PageSection>

            <PageSection>
                <Subheading>Tickets</Subheading>
                {/*<PaymentForm />*/}
            </PageSection>
        </PageWrapper>
    );
};

export default dynamic(() => Promise.resolve(SpringDoins6030), { ssr: false });

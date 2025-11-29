'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/button';
import { Heading, Text } from '@/components/heading';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

const CloverGoCancelPage = () => {
    const navigate = useRouter();
    const navigateHome = () => navigate.push('/');

    useEffect(() => {
        setTimeout(navigateHome, 3000);
    });

    return (
        <PageWrapper>
            <PageSection>
                <div className="mx-auto flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <Heading>Transaction Cancelled</Heading>
                    </div>

                    <Text center>Redirecting you to the home page, now.</Text>

                    <div className="flex justify-center">
                        <Button onClick={navigateHome}>Home</Button>
                    </div>
                </div>
            </PageSection>
        </PageWrapper>
    );
};

export default CloverGoCancelPage;

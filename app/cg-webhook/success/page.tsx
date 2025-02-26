'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/button';
import { Heading, Subheading, Text } from '@/components/heading';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

const CloverGoSuccessPage = () => {
    const navigate = useRouter();
    useEffect(() => {
        setTimeout(() => navigate.push('/'), 3000);
    });

    return (
        <PageWrapper>
            <PageSection>
                <div className="flex flex-col mx-auto gap-8">
                    <div className="flex flex-col gap-4">
                        <Heading>Transaction Success</Heading>
                        <Subheading>You&apos;re all set</Subheading>
                    </div>

                    <Text center>Redirecting you to the home page, now</Text>

                    <div className="flex justify-center">
                        <Button link href="/">
                            Home
                        </Button>
                    </div>
                </div>
            </PageSection>
        </PageWrapper>
    );
};

export default CloverGoSuccessPage;

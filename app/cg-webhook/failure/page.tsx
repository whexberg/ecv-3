'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/button';
import { Heading, Subheading, Text } from '@/components/heading';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

const CloverGoFailurePage = () => {
    const router = useRouter();
    const navigateHome = () => router.push('/');

    return (
        <PageWrapper>
            <PageSection>
                <div className="mx-auto flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <Heading>Oh no!</Heading>
                        <Subheading>Something went wrong</Subheading>

                        <Text center>
                            Please try again, later. If it keeps happening, let the Cyber Recorder (Pathogen) know.
                        </Text>
                    </div>

                    <div className="flex justify-center">
                        <Button onClick={navigateHome}>Home</Button>
                    </div>
                </div>
            </PageSection>
        </PageWrapper>
    );
};

export default CloverGoFailurePage;

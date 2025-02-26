'use client';

import { Button } from '@/components/button';
import { Heading, Subheading, Text } from '@/components/heading';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

const CloverGoFailurePage = () => {
    return (
        <PageWrapper>
            <PageSection>
                <div className="flex flex-col mx-auto gap-8">
                    <div className="flex flex-col gap-4">
                        <Heading>Oh no!</Heading>
                        <Subheading>Something went wrong</Subheading>

                        <Text center>
                            Please try again, later. If it keeps happening, let the Cyber Recorder (Pathogen) know.
                        </Text>
                    </div>

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

export default CloverGoFailurePage;

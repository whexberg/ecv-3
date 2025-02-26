'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Button } from '@/components/button';
import { Heading, Subheading, Text } from '@/components/heading';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

const SpringDoins6030 = () => {
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
                        <Button link href="https://link.clover.com/urlshortener/qPPSBm">
                            Pre Pay Now!
                        </Button>
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
                        <Text>📅 Date: April 25-27, 2025 C.Y. 6030</Text>
                        <Text>📍 Location: Foresthill, CA </Text>
                        <Text>💰 Cost:</Text>
                        <ul className="list-disc list-inside pl-8">
                            <Text as="li">Redshirt: $60 ($55 Prepay)</Text>
                            <Text as="li">PBC: $103</Text>
                            <Text as="li">NO RETREADS</Text>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button link href="https://link.clover.com/urlshortener/qPPSBm">
                        Pre Pay Now!
                    </Button>
                </div>
            </PageSection>
        </PageWrapper>
    );
};

export default dynamic(() => Promise.resolve(SpringDoins6030), { ssr: false });

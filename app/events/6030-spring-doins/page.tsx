'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/button';
import { Text } from '@/components/heading';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

const SpringDoins6030 = () => {
    return (
        <PageWrapper>
            <PageSection subheading="LSD #3 ECV Returns To ForestHill" heading="Spring Doins 6030">
                <div className="flex flex-col max-w-3xl mx-auto gap-8">
                    <Text>
                        Humbug Budman Also and his board of questionable characters have got a doins planned to bring
                        you back in time. A time where all brothers are treated with equal indignity. The Slippery, both
                        big and small, will be staffed by the finest Vituscan Riders on two wheels. The Chapter cook
                        crew will be servn&apos; up some of the most delectable meals including a Friday $5 chip night.
                        Saturday, Breakfast, mid-day delights, and a Dinner to fill the gold pan of a prospector
                    </Text>

                    <div className="flex justify-center">
                        <Button link href="https://link.clover.com/urlshortener/qPPSBm">
                            Pre Pay Now!
                        </Button>
                    </div>

                    <div className="flex gap-4 mx-auto">
                        <Link href="/images/flyers/spring-6030-1.jpg">
                            <Image
                                priority
                                src="/images/flyers/spring-6030-1.jpg"
                                alt="Spring Doin Flyer Page 1"
                                width={0}
                                height={0}
                                className="w-full mx-auto"
                            />
                        </Link>
                        <Link href="/images/flyers/spring-6030-2.jpg">
                            <Image
                                priority
                                src="/images/flyers/spring-6030-2.jpg"
                                alt="Spring Doin Flyer Page 1"
                                width={0}
                                height={0}
                                className="w-full mx-auto"
                            />
                        </Link>
                    </div>
                </div>
            </PageSection>

            <PageSection heading="Time & Location">
                <div className="flex flex-col max-w-3xl mx-auto gap-8">
                    <div>
                        <Text>📅 Date: April 25-27, 2025 C.Y. 6030</Text>
                        <Text>💰 Cost:</Text>
                        <ul className="list-disc list-inside pl-8">
                            <Text as="li">Redshirt: $60 ($55 Prepay)</Text>
                            <Text as="li">PBC: $103</Text>
                            <Text as="li">NO RETREADS</Text>
                        </ul>
                        <Text>📍 Location: Foresthill, CA</Text>
                        <ul className="list-disc list-inside pl-8">
                            <Text as="li">Take I-80 toward Auburn</Text>
                            <Text as="li">Exit 121 for Foresthill Rd</Text>
                            <Text as="li">Turn left on Blackhawk Rd (1.5 miles)</Text>
                            <Text as="li">The entrance will be on your left (Follow the signs)</Text>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <Button link href="https://link.clover.com/urlshortener/qPPSBm">
                            Pre Pay Now!
                        </Button>
                    </div>
                </div>
            </PageSection>

            <PageSection></PageSection>
        </PageWrapper>
    );
};

export default dynamic(() => Promise.resolve(SpringDoins6030), { ssr: false });

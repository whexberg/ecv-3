'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/button';
import { Text } from '@/components/heading';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

export default function SpringDoins6030() {
    const router = useRouter();

    return (
        <PageWrapper>
            <PageSection subheading="LSD #3 ECV Returns To ForestHill" heading="Spring Doins 6030" narrow>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Text>
                        Humbug Budman Also and his board of questionable characters have got a doins planned to bring
                        you back in time. A time where all brothers are treated with equal indignity. The Slippery, both
                        big and small, will be staffed by the finest Vituscan Riders on two wheels. The Chapter cook
                        crew will be servn&apos; up some of the most delectable meals including a Friday $5 chip night.
                        Saturday, Breakfast, mid-day delights, and a Dinner to fill the gold pan of a prospector
                    </Text>

                    <Button onClick={() => router.push('https://link.clover.com/urlshortener/qPPSBm')}>
                        Pre Pay Now!
                    </Button>

                    <div className="mx-auto flex gap-4">
                        <Link href="/images/flyers/spring-6030-1.jpg" target="_blank">
                            <Image
                                priority
                                src="/images/flyers/spring-6030-1.jpg"
                                alt="Spring Doin Flyer Page 1"
                                width={0}
                                height={0}
                                className="mx-auto w-full"
                            />
                        </Link>
                        <Link href="/images/flyers/spring-6030-2.jpg" target="_blank">
                            <Image
                                priority
                                src="/images/flyers/spring-6030-2.jpg"
                                alt="Spring Doin Flyer Page 1"
                                width={0}
                                height={0}
                                className="mx-auto w-full"
                            />
                        </Link>
                    </div>
                </div>
            </PageSection>

            <PageSection heading="Time & Location">
                <div className="mx-auto flex max-w-3xl flex-col gap-8">
                    <div>
                        <Text>📅 Date: April 25-27, 2025 C.Y. 6030</Text>
                        <Text>💰 Cost:</Text>
                        <ul className="list-inside list-disc pl-8">
                            <Text as="li">Redshirt: $60 ($55 Prepay)</Text>
                            <Text as="li">PBC: $103</Text>
                            <Text as="li">NO RETREADS</Text>
                        </ul>
                        <Text>📍 Location: Foresthill, CA</Text>
                        <ul className="list-inside list-disc pl-8">
                            <Text as="li">Take I-80 toward Auburn</Text>
                            <Text as="li">Exit 121 for Foresthill Rd</Text>
                            <Text as="li">Turn left on Blackhawk Rd (1.5 miles)</Text>
                            <Text as="li">The entrance will be on your left (Follow the signs)</Text>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={() => router.push('https://link.clover.com/urlshortener/qPPSBm')}>
                            Pre Pay Now!
                        </Button>
                    </div>
                </div>
            </PageSection>

            <PageSection></PageSection>
        </PageWrapper>
    );
}

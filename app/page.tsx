'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/button';
import { Heading, SmallText, Subheading, Text } from '@/components/heading';
import PageSection from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

const sponsors = [
    {
        name: 'Body & Soul Tattoo And Piercing',
        logo: './images/sponsors/body_soul_tattoo.jpeg',
        link: 'https://www.facebook.com/BodySoulTattoo/',
    },
    {
        name: 'The Happy Mouth Bakery & Cafe',
        logo: './images/sponsors/happy_mouth.jpg',
        link: 'https://www.facebook.com/profile.php?id=100091792135097',
    },
    {
        name: 'Joker from The Cinders',
        logo: './images/sponsors/cinders.jpg',
        link: 'https://www.facebook.com/profile.php?id=100061688721666',
    },
    { name: 'Holes from Phat Chads', logo: './images/sponsors/Phatchads+.png', link: 'https://www.phatchads.com/' },
    {
        name: 'El Tapatio Restaurant (Sunrise Ave)',
        logo: './images/sponsors/ElTapatio-1x.png',
        link: 'https://eltapatioca.com/',
    },
    {
        name: 'Cycle Gear (Rancho Cordova)',
        logo: './images/sponsors/Cycle_Gear_Logo.png',
        link: 'https://www.cyclegear.com/',
    },
    {
        name: "Stoney's Rocking Rodeo",
        logo: './images/sponsors/c194cb2331511a39ee0b2a8a68fe6792.png',
        link: 'https://www.stoneyinn.net/',
    },
];

export default function Home() {
    const router = useRouter();

    return (
        <PageWrapper>
            <PageSection heading="Lord Sholto Douglas" subheading="E Clampus Vitus Chapter #3" id="title">
                <Image
                    src="./images/chapter-logo.jpg"
                    width={300}
                    height={300}
                    alt="Lord Sholto Douglas Logo"
                    className="mx-auto"
                />
            </PageSection>

            <PageSection heading="Upcoming Events" id="events">
                <div className="flex flex-col items-center justify-center gap-8">
                    <div className="mx-auto mt-8 flex max-w-3xl basis-1/2 flex-col justify-center gap-4">
                        <Heading>Lord Sholto Douglas Chapter 3 ECV Returns to Foresthill</Heading>
                        <Subheading>Spring Doins 6030</Subheading>

                        <div>
                            <Text center>
                                LSD #3 Humbug &quot;Budman Also&quot; welcomes all brothers in good standing to 6030
                                Spring Doins!
                            </Text>
                            <Text center>3 Days of good food, full cup, and brotherhood at it&apos;s finest</Text>
                        </div>
                        {/*<Paragraph center>More information coming soon!</Paragraph>*/}
                        <div className="mt-8 flex justify-center">
                            <Button onClick={() => router.push('/events/6030-spring-doins')}>More Info</Button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="mx-auto flex max-w-3xl gap-4">
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
                        <SmallText center>(Click images to view full size)</SmallText>
                    </div>
                </div>
            </PageSection>

            {/*<PageSection heading="Upcoming Events" id="beanfeed">*/}
            {/*    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">*/}
            {/*        <div className="basis-1/2">*/}
            {/*            <Image*/}
            {/*                src="./images/bean-feed.jpg"*/}
            {/*                width={0}*/}
            {/*                height={0}*/}
            {/*                alt="Bean Feed"*/}
            {/*                className="w-full max-w-xl group-hover:opacity-5 mx-auto"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="basis-1/2">*/}
            {/*            <div className="flex flex-col basis-1/2 justify-center gap-4 mt-8 max-w-3xl mx-auto">*/}
            {/*                <Heading>The 43rd Annual Bean Feed and Hawkers&apos; Faire</Heading>*/}
            {/*                <div className="flex flex-col gap-1">*/}
            {/*                    <Paragraph>📅 Date: Feb 8, 6030 (2025)</Paragraph>*/}
            {/*                    <Paragraph>📍 Location: 1273 High Street, Auburn, CA </Paragraph>*/}
            {/*                    <Paragraph>💰 Cost: $35</Paragraph>*/}
            {/*                </div>*/}

            {/*                <Paragraph>*/}
            {/*                    Brothers, gather &#39;round and prepare for an event so monumental, so flavorful, and so*/}
            {/*                    profoundly absurd that it could only come from the hallowed halls of the Lord Sholto*/}
            {/*                    Douglas #3 Chapter of E Clampus Vitus. This year&apos;s Great Bean Feed promises to be a*/}
            {/*                    culinary triumph, paying homage to the chapter&apos;s namesake while fortifying our*/}
            {/*                    spirits (and our bellies) with history, humor, and a healthy heap of beans.*/}
            {/*                </Paragraph>*/}

            {/*                <Paragraph>*/}
            {/*                    Under the benevolent leadership of Budman Also, Noble Grand Humbug Extraordinaire, the*/}
            {/*                    Lord Sholto Douglas #3 Chapter has outdone itself, crafting a celebration worthy of the*/}
            {/*                    greatest Clampers—and the hungriest jackasses—of all time.*/}
            {/*                </Paragraph>*/}

            {/*                <Paragraph xlarge bold>*/}
            {/*                    What Awaits:*/}
            {/*                </Paragraph>*/}
            {/*                <div className="flex flex-col gap-4 px-0 sm:px-8">*/}
            {/*                    <Paragraph bold>Beans Beyond Compare</Paragraph>*/}
            {/*                    <Paragraph>*/}
            {/*                        Simmered to perfection in kettles the size of a miner&apos;s ambition, some of these*/}
            {/*                        beans are said to be seasoned with a secret spice blend, whispered to Joe Zumwalt by*/}
            {/*                        a ghostly prospector while visiting a forgotten Clamper plaque.*/}
            {/*                    </Paragraph>*/}

            {/*                    <Paragraph bold>Epic Accompaniments</Paragraph>*/}
            {/*                    <Paragraph>*/}
            {/*                        From slabs of cornbread thicker than a Clamper&apos;s wallet after payday to*/}
            {/*                        sausages that have been declared historically significant in their own right, no*/}
            {/*                        plate shall be left empty.*/}
            {/*                    </Paragraph>*/}

            {/*                    <Paragraph bold>Raucous Revelry</Paragraph>*/}
            {/*                    <Paragraph>*/}
            {/*                        Expect tall tales, hearty laughter, and perhaps a spontaneous reenactment of the*/}
            {/*                        Double Reverse Jackass Salute, should the crowd be deemed worthy.*/}
            {/*                    </Paragraph>*/}
            {/*                </div>*/}
            {/*                <Paragraph>*/}
            {/*                    So grab your red shirts, polish your black hats, and prepare for an event that will go*/}
            {/*                    down in Clamper history as one of the finest displays of fraternal absurdity. Long live*/}
            {/*                    the Lord Sholto Douglas #3 Chapter, and long may our beans simmer!*/}
            {/*                </Paragraph>*/}

            {/*                <div className="flex justify-center gap-4 mt-8">*/}
            {/*                    <Paragraph>Payment accepted at the door.</Paragraph>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</PageSection>*/}

            {/*<PageSection heading="Quick Links" id="quick-links">*/}
            {/*    <div className="flex justify-center gap-4 mt-8">*/}
            {/*        <Link*/}
            {/*            href="/board-members/board-members"*/}
            {/*            className="border-2 border-red-800 px-6 py-4 hover:bg-red-800"*/}
            {/*        >*/}
            {/*            View the Board*/}
            {/*        </Link>*/}
            {/*        <Link href="/calendar/calendar" className="border-2 border-red-800 px-6 py-4 hover:bg-red-800">*/}
            {/*            Calendar*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</PageSection>*/}

            <PageSection heading="The Clamper's Creed" id="creed" narrow>
                <Text center>
                    As I pass through life, may I always be humble;
                    <br />
                    may I never take myself seriously;
                    <br />
                    may I always appreciate a little of the ridiculous;
                    <br />
                    may I always be a two-fisted Clamper when the bottle passes my way
                    <br />
                    and if I imbibe, and can&apos;t hold it like a man,
                    <br />
                    then may I always be able to pass it to the next brother;
                    <br />
                    may I never forget the stout-hearted men who settled a great western wilderness
                    <br />
                    and the heritage we have today.
                    <br />
                    May I never fail to appreciate a bit of western lore.
                </Text>
                <Text center>- Anonymous</Text>
            </PageSection>

            <PageSection id="sponsors" heading="Sponsors" narrow>
                <div className="flex flex-wrap items-center justify-center">
                    {sponsors.map((sponsor) => (
                        <a
                            key={sponsor.name}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex w-1/4 flex-col items-center p-4"
                        >
                            <Image
                                src={sponsor.logo}
                                width={300}
                                height={300}
                                alt={`${sponsor.name} logo`}
                                className="group-hover:opacity-5"
                            />
                            <span className="bg-dk_background/5 absolute inset-0 z-40 hidden items-center justify-center text-sm font-medium group-hover:flex">
                                {sponsor.name}
                            </span>
                        </a>
                    ))}
                </div>
            </PageSection>
        </PageWrapper>
    );
}

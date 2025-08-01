import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/src/components/button';
import { Heading, Text } from '@/src/components/heading';
import { PageSection } from '@/src/components/page-section';
import { PageWrapper } from '@/src/components/page-wrapper';

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
        name: 'Brew Masters Deli',
        logo: './images/sponsors/brew_masters_deli.jpg',
        link: 'https://www.facebook.com/Brewmastersdeli/',
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
    return (
        <PageWrapper>
            <PageSection heading="Lord Sholto Douglas" subheading="E Clampus Vitus Chapter #3" id="title">
                <img
                    src="/images/chapter-logo.jpg"
                    width={300}
                    height={300}
                    alt="Lord Sholto Douglas Logo"
                    className="mx-auto"
                />
            </PageSection>

            <PageSection heading="Upcoming Events" id="events">
                <div className="flex flex-col items-center justify-center gap-8">
                    <div className="mx-auto mt-8 flex max-w-3xl basis-1/2 flex-col justify-center gap-4">
                        <Heading center>Reach Around the Rockies 3-Way 6030</Heading>

                        <div className="flex w-full flex-col gap-4">
                            <Link
                                href="https://clampersonly.com/event/reach-around-the-rockies-doins-2025/"
                                target="_blank"
                            >
                                <img
                                    src="https://clampersonly.com/wp-content/uploads/2024/12/Reach-Around-Proclomation-212x300.png.webp"
                                    alt=""
                                    className="mx-auto"
                                    width={212}
                                    height={300}
                                />
                            </Link>
                            <Text center>Saddle Up for the Hewgag Breys Extravaganza!</Text>

                            <Text>
                                South Pass Chapter #1867, Snake River Chapter #1811 & Lord Sholto Douglas #3 of E
                                Clampus Vitus® present of E Clampus Vitus® are rolling out the barrel for a dedication
                                that&apos;s bigger than a buffalo&apos;s breakfast! We&apos;re talking about the one and
                                only William F. &quot;Buffalo Bill&quot; Cody and his world-famous Irma Hotel in Cody,
                                Wyoming.
                            </Text>

                            <Text>
                                On June 21, 2025, we&apos;re throwing a shindig that&apos;ll make the Wild West proud.
                                Expect a wild mix of public figures, dignitaries, and maybe even some national media.
                                But remember, folks, keep it classy—no retreads, no vulgar speech, and definitely no
                                intoxication!
                            </Text>

                            <Text>
                                Prepay to guarantee your meals, pins, coins, and more. And if you&apos;re feeling extra
                                fancy, snag a PBC Prepay for just $187.60 and get all the swag! But be warned, if you
                                show up at the gate, it&apos;s a cool $300.00 (no guarantees or promises)!
                            </Text>

                            <Text>
                                So, mark your calendars, grab your best red shirt and hat, and get ready for a
                                dedication like no other. We promise it&apos;ll be a &quot;Hewgag Breys&quot; you
                                won&apos;t forget!
                            </Text>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Button
                                link
                                href="https://clampersonly.com/event/reach-around-the-rockies-doins-2025/"
                                blankTarget
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </PageSection>

            <PageSection heading="The Clamper's Creed" id="creed" narrow>
                <Text center>As I pass through life, may I always be humble;</Text>
                <Text center>may I never take myself seriously;</Text>
                <Text center>may I always appreciate a little of the ridiculous;</Text>
                <Text center>may I always be a two-fisted Clamper when the bottle passes my way</Text>
                <Text center>and if I imbibe, and can&apos;t hold it like a man,</Text>
                <Text center>then may I always be able to pass it to the next brother;</Text>
                <Text center>may I never forget the stout-hearted men who settled a great western wilderness</Text>
                <Text center>and the heritage we have today.</Text>
                <Text center>May I never fail to appreciate a bit of western lore.</Text>
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
                            <img
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

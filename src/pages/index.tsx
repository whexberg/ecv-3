'use client';

import PageSection from '@/components/page-section';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button';

const sponsors = [
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
        <>
            <PageSection title="Lord Sholto Douglas - E Clampus Vitus Chapter #3" id="title">
                <Image
                    src="./images/chapter-logo.jpg"
                    width={300}
                    height={300}
                    alt="Lord Sholto Douglas Logo"
                    className="mx-auto"
                />
            </PageSection>

            <PageSection title="The 43rd Annual Bean Feed and Hawkers' Faire" id="beanfeed">
                <Image
                    src="./images/bean-feed.jpg"
                    width={0}
                    height={0}
                    alt={`Bean Feed`}
                    className="w-full max-w-xl group-hover:opacity-5 mx-auto"
                />

                <div className="flex justify-center gap-4 mt-8">
                    <Button link href="https://link.clover.com/urlshortener/7LQ5kM" newTab>
                        Prepay NOW!
                    </Button>
                </div>
                <div className="flex flex-col justify-center gap-4 mt-8 max-w-3xl mx-auto">
                    <div className="flex flex-col gap-1 ">
                        <p>📅 Date: Feb 8, 6030 (2025)</p>
                        <p>📍 Location: [Insert Event Location]</p>
                        <p>💰 Cost: $35</p>
                    </div>

                    <p>
                        Brothers, gather ‘round and prepare for an event so monumental, so flavorful, and so profoundly
                        absurd that it could only come from the hallowed halls of the Lord Sholto Douglas #3 Chapter of
                        E Clampus Vitus. This year’s Great Bean Feed promises to be a culinary triumph, paying homage to
                        the chapter’s namesake while fortifying our spirits (and our bellies) with history, humor, and a
                        healthy heap of beans.
                    </p>

                    <p>
                        Under the benevolent leadership of Budman Also, Noble Grand Humbug Extraordinaire, the Lord
                        Sholto Douglas #3 Chapter has outdone itself, crafting a celebration worthy of the greatest
                        Clampers—and the hungriest jackasses—of all time.
                    </p>

                    <p className="text-xl font-bold">What Awaits:</p>
                    <div className="flex flex-col gap-4 px-0 sm:px-12">
                        <div>
                            <p className="font-bold">Beans Beyond Compare</p>
                            Simmered to perfection in kettles the size of a miner’s ambition, some of these beans are
                            said to be seasoned with a secret spice blend, whispered to Joe Zumwalt by a ghostly
                            prospector while visiting a forgotten Clamper plaque.
                        </div>
                        <div>
                            <p className="font-bold">Epic Accompaniments</p>
                            From slabs of cornbread thicker than a Clamper’s wallet after payday to sausages that have
                            been declared historically significant in their own right, no plate shall be left empty.
                        </div>
                        <div>
                            <p className="font-bold">Raucous Revelry</p>
                            Expect tall tales, hearty laughter, and perhaps a spontaneous reenactment of the Double
                            Reverse Jackass Salute, should the crowd be deemed worthy.
                        </div>
                    </div>
                    <p>
                        So grab your red shirts, polish your black hats, and prepare for an event that will go down in
                        Clamper history as one of the finest displays of fraternal absurdity. Long live the Lord Sholto
                        Douglas #3 Chapter, and long may our beans simmer!
                    </p>

                    <div className="flex justify-center gap-4 mt-8">
                        <Button link href="https://link.clover.com/urlshortener/7LQ5kM" newTab>
                            Prepay NOW!
                        </Button>
                    </div>
                </div>
            </PageSection>

            <PageSection title="Quick Links" id="quick-links">
                <div className="flex justify-center gap-4 mt-8">
                    <Link href="/board-members" className="border-2 border-red-700 px-6 py-4 hover:bg-red-700">
                        View the Board
                    </Link>
                    <Link href="/calendar" className="border-2 border-red-700 px-6 py-4 hover:bg-red-700">
                        Calendar
                    </Link>
                </div>
            </PageSection>

            <PageSection title="Mission Statement" id="mission">
                <div className="flex flex-col gap-4">
                    <p className="text-lg max-w-5xl mx-auto text-center">
                        From the rugged peaks to the dust-choked valleys of the American West, Lord Sholto Douglas,
                        Chapter #3 of E Clampus Vitus, stands as a steadfast guardian of history’s untamed spirit. We
                        are the keepers of legends, the heralds of forgotten pioneers, and the champions of community,
                        bound by an unyielding brotherhood forged in the fires of camaraderie and absurdity. With
                        reverence for the past and an eye on the future, we preserve the myths and truths of those who
                        dared to dream, toil, and endure. We are more than a chapter—we are a beacon of fellowship and
                        brotherhood, fueled by wit, wisdom, and an undying love of the magnificent legacy of the West.
                    </p>
                </div>
            </PageSection>

            <PageSection id="sponsors" title="Our Sponsors" className="bg-softBlack text-white">
                <div className="flex justify-center items-center flex-wrap    ">
                    {sponsors.map((sponsor) => (
                        <a
                            key={sponsor.name}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center relative group w-1/4 p-4"
                        >
                            <Image
                                src={sponsor.logo}
                                width={300}
                                height={300}
                                alt={`${sponsor.name} logo`}
                                className="group-hover:opacity-5"
                            />
                            <span className="hidden group-hover:flex bg-dk_background/5 justify-center items-center z-40 text-sm font-medium inset-0 absolute">
                                {sponsor.name}
                            </span>
                        </a>
                    ))}
                </div>
            </PageSection>
        </>
    );
}

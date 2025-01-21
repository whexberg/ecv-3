'use client';

import PageSection from '@/components/page-section';
import Image from 'next/image';
import Link from 'next/link';

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
                <div className="flex justify-center gap-4 mt-8">
                    <Link href="/board-members" className="border-2 border-primary px-6 py-4 hover:bg-primary">
                        View the Board
                    </Link>
                    <Link href="/events" className="border-2 border-primary px-6 py-4 hover:bg-primary">
                        View Events
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

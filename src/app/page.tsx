import Link from 'next/link';
import React from 'react';

import { Button } from '@/src/components/button';
import { Logo } from '@/src/components/logo';
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
                {/*<img src="/images/logo.svg" width={300} alt="Lord Sholto Douglas Logo" className="mx-auto" />*/}
                <div className="mx-auto">
                    <Logo />
                </div>

                <p className="mx-auto max-w-xl text-center text-lg md:text-xl">
                    Where history, hilarity, and brotherhood collide! Lord Sholto Douglas Chapter #3 of E Clampus Vitus
                    invites you to don your red shirt, polish your nonsense, and join us in celebrating forgotten lore,
                    outrageous tales, and the sacred art of silliness. This ain&apos;t your average historical society —
                    it&apos;s Clamping time!
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <Button link href="#events">
                        View Upcoming Events
                    </Button>
                </div>
            </PageSection>

            <PageSection heading="Upcoming Events" id="events">
                <div className="mx-auto mt-28 flex basis-1/2 flex-col justify-center gap-4">
                    <h3 className="font-display m-4 text-center text-4xl" id="sushi-night">
                        Sushi Night Fundraiser!
                    </h3>

                    <div className="mx-auto mt-4 flex max-w-7xl flex-col-reverse items-center gap-4 xl:grid xl:grid-cols-2 xl:flex-row xl:gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-display text-center text-2xl">Join us for boatloads of sushi</h4>

                            <div className="flex justify-center">
                                <Button link href="https://link.clover.com/urlshortener/jmF7QP">
                                    Get your seats!
                                </Button>
                            </div>

                            <ul>
                                <li className="text-accent text-center">7pm, October 10th, 2025</li>
                                <li className="text-accent text-center">7330 Fair Oaks Blvd</li>
                                <li className="text-accent text-center">$65 per person</li>
                            </ul>

                            <div>
                                Roll on down with your fellow Redshirts, family, and friends for a night of feasting and
                                fun! We’re laying out Boatloads of fresh sushi along with crowd-pleasing appetizers —
                                calamari, jalapeño bombs, flaming mushrooms, and edamame. Water and soda are on the
                                house; adult beverages and other extras are yours to snag at the bar.
                            </div>

                            <div>
                                Only the first <span className="font-bold">40 souls who prepay</span> will claim their
                                spots at the table — after that, the sign-up disappears like a lost miner’s stash. This
                                is a <span className="font-bold">fundraiser</span>, so no refunds (your gold dust goes
                                to a good cause).
                            </div>

                            <div>
                                We&apos;ll spice it up with a <span className="font-bold">50/50 raffle</span> and a few
                                <span className="font-bold"> secret door prizes</span> worthy of the Order. Bring your
                                kin, your friends, and your appetite — it’s going to be a legendary ECV evening!
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Button link href="https://link.clover.com/urlshortener/jmF7QP">
                                    Get your seats!
                                </Button>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/images/events/shogun-sushi/boats.jpg"
                                alt="Boatloads of Sushi"
                                className="border-accent shadow-card mx-auto max-w-1/2 border p-4 lg:max-w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-28 flex basis-1/2 flex-col justify-center gap-4">
                    <h3 className="font-display text-center text-4xl">Fall Doins 6030</h3>

                    <div className="mx-auto mt-4 flex max-w-7xl flex-col items-center gap-4 xl:grid xl:grid-cols-2 xl:gap-12">
                        <div>
                            <img
                                src="/images/events/fall-doins-6030.png"
                                alt="Lord Sholto Douglas Family Campout 2025"
                                className="border-accent shadow-card mx-auto max-w-1/2 border p-4 lg:max-w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-center">September 19-21, 6030 | Foresthill, CA</div>

                            <div>
                                <strong>Brothers!</strong> Have ye grown weary of the mundane world of logic and
                                sobriety? The legendary <strong>Fall Doins of Lord Sholto Douglas Chapter #3</strong> is
                                upon us! Gather your gear, your Goldust, and your finest ridiculous hat for three days
                                of legendary nonsense in the pines of Foresthill!
                            </div>

                            <div>
                                What awaits you? $5 chip night Friday, hearty breakfasts that could feed a donkey, The
                                Lady Bug Saloon flowing with cold beer and hot lies, cornhole & horseshoes with 50/50
                                stakes, and enough absurdity to make your head spin. PBCs beware—the Hangman BugMan is
                                hungry for your soul!
                            </div>

                            <div>
                                ⚠️ Pre-pay deadline: September 17th at midnight! First 100 pre-pays get exclusive
                                patches & pins. Don&apos;t let the Pre-Pay Portal to Pecuniary Salvation slam shut on
                                you!
                            </div>

                            <div className="text-center">Credo Quia Absurdum. Come get yours in Foresthill.</div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Button link href="/events/6030-fall-doins">
                            Learn More & Pre-Pay NOW!
                        </Button>
                    </div>
                </div>
            </PageSection>

            <PageSection heading="The Clamper's Creed" id="creed" narrow>
                <div className="text-center">
                    <div>As I pass through life, may I always be humble;</div>
                    <div>may I never take myself seriously;</div>
                    <div>may I always appreciate a little of the ridiculous;</div>
                    <div>may I always be a two-fisted Clamper when the bottle passes my way</div>
                    <div>and if I imbibe, and can&apos;t hold it like a man,</div>
                    <div>then may I always be able to pass it to the next brother;</div>
                    <div>may I never forget the stout-hearted men who settled a great western wilderness</div>
                    <div>and the heritage we have today.</div>
                    <div>May I never fail to appreciate a bit of western lore.</div>
                    <div>- Anonymous</div>
                </div>
            </PageSection>

            <PageSection id="sponsors" heading="Sponsors" narrow>
                <div className="flex flex-wrap items-center justify-center">
                    {sponsors.map((sponsor) => (
                        <Link
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
                        </Link>
                    ))}
                </div>
            </PageSection>
        </PageWrapper>
    );
}

import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/button';
import { EventCard } from '@/components/event-card';
import { Logo } from '@/components/logo';
import { PageSection } from '@/components/page-section';
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

            <PageSection id="donations">
                <h3 className="font-display m-4 mb-0 text-center text-4xl">Donations</h3>

                <div className="font-display text-center text-xl">
                    <p>Per Caritate Viduaribus Orphanabusque Sed Prime Viduaribus</p>
                </div>

                <p className="mx-auto max-w-xl text-center">
                    Looking to make a difference? Support the widows and orphans! Your generosity helps provide
                    essential support to the orphans in our community, and a special family in need, that we&apos;ve
                    adopted for this year&apos;s holiday season. Your donation goes directly toward their care, offering
                    food, shelter, and gifts this Christmas. Please consider giving — your contribution makes a real
                    difference in the lives of those who need it most.
                </p>

                <div className="mt-8 flex justify-center">
                    <Button link href="https://link.clover.com/urlshortener/gWbSpd">
                        Click to donate
                    </Button>
                </div>
            </PageSection>

            <PageSection>
                {[{ title: 'Pickelhaube Raffle', blurb: 'Win a Genuine WWII Bavarian Pickelhaube!' }].map((e, key) => {
                    return <EventCard key={key} />;
                })}
            </PageSection>

            <PageSection heading="Upcoming Events" id="events">
                <div className="mx-auto mt-28 flex basis-1/2 flex-col justify-center gap-4">
                    <h3 className="font-display m-4 mb-0 text-center text-4xl">Pickelhaube Raffle</h3>
                    <h4 className="font-display m-4 mt-0 text-center text-xl">
                        Win a Genuine WWII Bavarian Pickelhaube!
                    </h4>

                    <div className="mx-auto mt-4 flex max-w-7xl flex-col items-center gap-4 xl:gap-12">
                        <div className="flex flex-col gap-4">
                            <p>
                                This Clampyear, we&apos;re raffling off a true piece of history — an authentic WWII
                                Bavarian Pickelhaube helmet! Only 300 tickets are available, and they&apos;re going
                                fast.
                            </p>
                            <p>
                                All proceeds go to support Lord Sholto Douglas #3 chapter events and community efforts.
                                Get your ticket before they&apos;re gone — and may the Redshirts smile upon your luck!
                            </p>

                            <div className="mt-8 flex justify-center">
                                <Button link href="https://link.clover.com/urlshortener/xskgp9">
                                    Buy tickets now
                                </Button>
                            </div>

                            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div>
                                    <dt className="text-xs text-gray-500">How much are tickets?</dt>
                                    <dd className="font-medium">$20 each</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-gray-500">When is the drawing?</dt>
                                    <dd className="font-medium">Once all tickets are sold</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-gray-500">What if I&apos;m not there?</dt>
                                    <dd className="font-medium">
                                        You do not need to be present to win. We&apos;ll contact you after the drawing!
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="border-accent shadow-card mx-auto flex w-fit flex-wrap justify-center gap-4 border p-4">
                            {[
                                '/images/events/6030/raffle/pickelhaube/91d48a31-64f3-47e8-bf5e-9ba1397c2a87.jpeg',
                                '/images/events/6030/raffle/pickelhaube/766034ae-f7f5-4fa3-8b27-9d0772bc51d3.jpeg',
                                '/images/events/6030/raffle/pickelhaube/ea3682a9-f817-4b36-9188-fe649cfa4cf3.jpeg',
                            ].map((link, idx) => (
                                <div className="w-[250px]" key={link}>
                                    <Link href={link}>
                                        <img src={link} alt={`Pickelhaube picture ${idx}`} className="w-full" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-28 flex basis-1/2 flex-col justify-center gap-4">
                    <h3 className="font-display m-4 text-center text-4xl" id="sushi-night">
                        6030 Widders Ball
                    </h3>

                    <div className="mx-auto mt-4 flex max-w-7xl flex-col-reverse items-center gap-4 xl:grid xl:grid-cols-2 xl:flex-row xl:gap-12">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-center">
                                <Button link href="https://link.clover.com/urlshortener/qr87HP">
                                    Prepay now
                                </Button>
                            </div>

                            <p>
                                Brothers, family, and friends — the Widders’ Ball returns for{' '}
                                <strong>2025 (C.Y. 6030)</strong>! Join us for an evening of merriment, music, and
                                fellowship in true Clamper spirit. Dust off your finest redshirt attire, polish your
                                dancing shoes, and prepare for a night filled with laughter, revelry, and the
                                camaraderie that makes our Order unique.
                            </p>

                            <p>
                                We’ll celebrate our history, honor our widders, and make memories that will carry us
                                well into the new Clamp year. Whether you come for the dancing, the stories, or the
                                company — there’s a seat at our table for you.
                            </p>

                            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <dt className="text-xs text-gray-500">When</dt>
                                    <dd className="font-medium">Saturday, November 8th, 2025</dd>
                                    <dd className="font-medium">7:03pm - 11:03pm</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-gray-500">Where</dt>
                                    <dd className="font-medium">American Legion Post84</dd>
                                    <dd className="font-medium">100 East St. Auburn, CA</dd>
                                </div>
                            </dl>

                            <div className="mt-8 flex justify-center">
                                <Button link href="https://link.clover.com/urlshortener/qr87HP">
                                    Prepay now
                                </Button>
                            </div>
                        </div>
                        <div className="border-accent shadow-card mx-auto flex max-w-1/2 flex-col gap-4 border p-4 lg:max-w-full">
                            <img src="/images/events/6030/widders-ball-flyer/1.png" alt="Widders Ball Flyer Page 1" />
                            <img src="/images/events/6030/widders-ball-flyer/2.png" alt="Widders Ball Flyer Page 2" />
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

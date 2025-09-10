'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/src/components/button';
import { PageSection } from '@/src/components/page-section';
import { PageWrapper } from '@/src/components/page-wrapper';

export default function SpringDoins6030() {
    const router = useRouter();
    return (
        <PageWrapper>
            <PageSection heading="Fall Doins 6030" narrow>
                <div className="mx-auto flex gap-4">
                    <Link href="/images/flyers/fall-6030-1.png" target="_blank">
                        <Image
                            priority
                            src="/images/flyers/fall-6030-1.png"
                            alt="Spring Doin Flyer Page 1"
                            width={0}
                            height={0}
                            className="mx-auto w-full"
                        />
                    </Link>
                    <Link href="/images/flyers/fall-6030-2.png" target="_blank">
                        <Image
                            priority
                            src="/images/flyers/fall-6030-2.png"
                            alt="Spring Doin Flyer Page 1"
                            width={0}
                            height={0}
                            className="mx-auto w-full"
                        />
                    </Link>
                </div>
            </PageSection>

            <PageSection heading="Prepay Your Rub!">
                <div className="border-accent text-accent mx-auto my-10 flex max-w-3xl flex-col gap-4 rounded-xl border p-6 shadow-lg">
                    <h2 className="text-accent text-center text-2xl font-bold uppercase md:text-3xl">
                        ⚠️ Hear Ye, Hear Ye, Ye Noble & Unwashed Clamper Brethren ⚠️
                    </h2>
                    <p>
                        The <span className="text-accent font-semibold">Pre-Pay Portal to Pecuniary Salvation</span>{' '}
                        slams shut at the stroke of midnight on the{' '}
                        <span className="decoration-accent underline decoration-dotted">
                            17th day of September, in the year of our Clamp, 2025
                        </span>
                        .
                    </p>
                    <p>
                        Once the great timepiece tolls
                        <span className="text-accent italic"> twelve booms</span> and we cross into the early mists of
                        <span className="text-accent font-semibold"> Thursday, September 18</span>, all hopes of
                        pre-paying shall vanish into the ether like cheap whiskey at a Clamper cookout.
                    </p>
                    <p>
                        That means if you ain&apos;t coughed up your coin by the end of{' '}
                        <span className="decoration-accent underline decoration-dotted">Wednesday night</span>,
                        you&apos;re plum outta luck. And should you stagger in on Thursday with dreams of
                        &quot;pre-paying for the doin&apos;s,&quot; you will be met with profound sorrow and
                        bureaucratic rebuke.
                    </p>
                    <div>
                        <p className="text-accent text-center text-xl font-extrabold tracking-wide">
                            ADVANCE THY LIBATION LEVY NOW, OR WEEP LATER.
                        </p>
                        <p className="text-accent text-center italic">So sayeth the Ancient Order of Empty Pockets.</p>
                    </div>
                    <div className="flex justify-center text-white">
                        <Button
                            onClick={() => {
                                router.push('https://link.clover.com/urlshortener/Pbyppt');
                            }}
                        >
                            Pre Pay Now!
                        </Button>
                    </div>
                </div>
            </PageSection>

            <PageSection heading="Time & Location">
                <div className="mx-auto max-w-4xl">
                    <p className="mb-6 text-lg">
                        <strong>Brothers!</strong> Have ye grown weary of the mundane world of logic and sobriety? Do
                        your boots thirst for red dust, your belly for beer, and your heart for legendary nonsense? Then
                        gather your gear, your Goldust, and your finest ridiculous hat—
                        <strong>the Fall Doins of Lord Sholto Douglas Chapter #3 is upon us!</strong>
                    </p>

                    <div className="border-accent bg-accent/40 mb-6 border-l-4 p-4">
                        <p className="text-lg font-semibold text-white">
                            🦅 September 19-21, 6030 (2025 to the uninitiated)
                        </p>
                        <p className="text-lg font-semibold text-white">
                            🌲 Foresthill, CA — where the pine trees are tall, and the stories are taller.
                        </p>
                    </div>

                    <h3 className="text-accent mb-2 text-2xl font-bold">What’s in Store?</h3>
                    <ul className="mb-6 list-inside list-disc space-y-1">
                        <li>
                            <strong>$5 chip night Friday</strong> (because we love you)
                        </li>
                        <li>🥓 Hearty hot breakfasts, miner-worthy dinners, and enough grub to clog a donkey</li>
                        <li>🍺 The Lady Bug Saloon flowing freely with cold beer and hot lies</li>
                        <li>🎯 Cornhole & Horseshoes with 50/50 stakes</li>
                        <li>🪓 No chainsaws. No wives. No dogs. No common sense.</li>
                    </ul>

                    <h3 className="text-accent mb-2 text-2xl font-bold">For PBCs (Poor Blind Candidates):</h3>
                    <p className="mb-6">
                        Report Friday. Get terrified by Saturday <strong>10:03 AM sharp</strong>. Not 10:04. Bring your
                        maps, scrolls, and courage. White coats await. The Hangman BugMan is hungry for your soul.
                    </p>

                    <h3 className="text-accent mb-2 text-2xl font-bold">The Rub:</h3>
                    <ul className="mb-6 list-inside list-disc space-y-1">
                        <li>
                            <strong>Redshirts:</strong> Pre-pay $60, Day-of $70
                        </li>
                        <li>
                            <strong>PBC Tribute:</strong> $133
                        </li>
                        <li>
                            <strong>First 100 pre-pay</strong> get a patch & pin to prove they survived
                        </li>
                    </ul>

                    <div className="p-4 text-center text-white italic">
                        Access is limited, so get your tent staked early. Personal campfires are not allowed — burn your
                        pride instead.
                    </div>

                    <div className="border-accent mt-8 border-t pt-6">
                        <p className="text-accent text-center text-xl font-semibold">Credo Quia Absurdum.</p>
                        <p className="text-center text-lg font-medium">Come get yours in Foresthill.</p>
                    </div>
                </div>
            </PageSection>
        </PageWrapper>
    );
}

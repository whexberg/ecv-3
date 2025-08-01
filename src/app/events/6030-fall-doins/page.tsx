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
            <PageSection heading="Time & Location">
                <div className="mx-auto max-w-4xl">
                    <p className="mb-6 text-lg">
                        <strong>Brothers!</strong> Have ye grown weary of the mundane world of logic and sobriety? Do
                        your boots thirst for red dust, your belly for beer, and your heart for legendary nonsense? Then
                        gather your gear, your Goldust, and your finest ridiculous hat—
                        <strong>the Fall Doins of Lord Sholto Douglas Chapter #3 is upon us!</strong>
                    </p>

                    <div className="mb-6 border-l-4 border-red-600 bg-red-800/40 p-4">
                        <p className="text-lg font-semibold text-white">
                            🦅 September 19-21, 6030 (2025 to the uninitiated)
                        </p>
                        <p className="text-lg font-semibold text-white">
                            🌲 Foresthill, CA — where the pine trees are tall, and the stories are taller.
                        </p>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-red-600">What’s in Store?</h3>
                    <ul className="mb-6 list-inside list-disc space-y-1">
                        <li>
                            <strong>$5 chip night Friday</strong> (because we love you)
                        </li>
                        <li>🥓 Hearty hot breakfasts, miner-worthy dinners, and enough grub to clog a donkey</li>
                        <li>🍺 The Lady Bug Saloon flowing freely with cold beer and hot lies</li>
                        <li>🎯 Cornhole & Horseshoes with 50/50 stakes</li>
                        <li>🪓 No chainsaws. No wives. No dogs. No common sense.</li>
                    </ul>

                    <h3 className="mb-2 text-2xl font-bold text-red-600">For PBCs (Poor Blind Candidates):</h3>
                    <p className="mb-6">
                        Report Friday. Get terrified by Saturday <strong>10:03 AM sharp</strong>. Not 10:04. Bring your
                        maps, scrolls, and courage. White coats await. The Hangman BugMan is hungry for your soul.
                    </p>

                    <h3 className="mb-2 text-2xl font-bold text-red-600">The Rub:</h3>
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
                    {/*<p className="mb-6">*/}
                    {/*    📫 Mail: P.O. Box 9032, Auburn, CA 95604*/}
                    {/*    <br />*/}
                    {/*    📧 Online:{' '}*/}
                    {/*    <a href="mailto:online@lordsholtodouglas.com" className="text-red-700 underline">*/}
                    {/*        online@lordsholtodouglas.com*/}
                    {/*    </a>*/}
                    {/*</p>*/}

                    <div className="p-4 text-center text-white italic">
                        Access is limited, so get your tent staked early. Personal campfires are not allowed — burn your
                        pride instead.
                    </div>

                    <div className="mx-auto my-10 flex max-w-3xl flex-col gap-4 rounded-xl border border-red-700 p-6 text-red-500 shadow-lg">
                        <h2 className="text-center text-2xl font-bold text-red-600 uppercase md:text-3xl">
                            ⚠️ Hear Ye, Hear Ye, Ye Noble & Unwashed Clamper Brethren ⚠️
                        </h2>
                        <p>
                            The{' '}
                            <span className="font-semibold text-red-400">Pre-Pay Portal to Pecuniary Salvation</span>{' '}
                            slams shut at the stroke of midnight on the{' '}
                            <span className="underline decoration-red-400 decoration-dotted">
                                17th day of September, in the year of our Clamp, 2025
                            </span>
                            .
                        </p>
                        <p>
                            Once the great timepiece tolls
                            <span className="text-red-300 italic"> twelve booms</span> and we cross into the early mists
                            of
                            <span className="font-semibold text-red-400"> Thursday, September 18</span>, all hopes of
                            pre-paying shall vanish into the ether like cheap whiskey at a Clamper cookout.
                        </p>
                        <p>
                            That means if you ain&apos;t coughed up your coin by the end of{' '}
                            <span className="underline decoration-red-400 decoration-dotted">Wednesday night</span>,
                            you&apos;re plum outta luck. And should you stagger in on Thursday with dreams of
                            &quot;pre-paying for the doin&apos;s,&quot; you will be met with profound sorrow and
                            bureaucratic rebuke.
                        </p>
                        <div>
                            <p className="text-center text-xl font-extrabold tracking-wide text-red-600">
                                ADVANCE THY LIBATION LEVY NOW, OR WEEP LATER.
                            </p>
                            <p className="text-center text-red-400 italic">
                                So sayeth the Ancient Order of Empty Pockets.
                            </p>
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

                    {/*<h3 className="mb-2 text-2xl font-bold text-red-600">Mark Your Calendar 6030–6031</h3>*/}
                    {/*<ul className="mb-6 list-inside list-disc space-y-1">*/}
                    {/*    <li>Widders Ball – 11/8</li>*/}
                    {/*    <li>Christmas Party – 12/19</li>*/}
                    {/*    <li>Bean Feed – 2/21/26</li>*/}
                    {/*    <li>Spring Doins – 4/17–4/19/26</li>*/}
                    {/*</ul>*/}

                    <div className="mt-8 border-t border-red-700 pt-6">
                        <p className="text-center text-xl font-semibold text-red-700">Credo Quia Absurdum.</p>
                        <p className="text-center text-lg font-medium">Come get yours in Foresthill.</p>
                    </div>
                </div>
            </PageSection>
        </PageWrapper>
    );
}

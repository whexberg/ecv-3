import PageSection from '@/components/page-section';

export default function AboutPage() {
    return (
        <PageSection title="Lord Sholto Douglas' Hall of Humbugery">
            <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8 mb-12">
                <p className="text-center text-lg leading-7">
                    Here we honor the legendary men who have ascended to the highest echelons of our board, carrying the
                    torch of our sacred traditions through the roaring tides of history into the present day. With a
                    resolve as unyielding as granite and a refusal to give any sucker an even break, these intrepid
                    volunteers have dedicated their hearts and minds to forging unforgettable functions, raising funds
                    to aid widows, orphans, and families in need. Even in the shadow of the darkest days, they have
                    risen like titans, tearing away the blindfold of despair to illuminate a path of hope and
                    possibility. These are not merely board members—they are stewards of dreams, architects of change,
                    and torchbearers of the indomitable spirit that defines us all.
                </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/images/humbugery/Grand+Banquet+Placemat+.jpg"
                alt="Grand Banquet Placemat"
                className="w-full pb-12"
            />
            <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                    '1+Furlong.jpg',
                    '2+Owens.jpeg',
                    '3+Crabbe.jpeg',
                    '4+Robinson.jpeg',
                    '5+Carlislie.jpeg',
                    '6+Scott.jpeg',
                    '7+Presley.jpeg',
                    '8+Dickenson.png',
                    '9+Cox.png',
                    '11+Smith.jpg',
                    '12+Fowler.jpg',
                    '13+Keefer.jpg',
                    '16+Mason.jpg',
                    '17+Grossglauser.png',
                    '18+West.jpg',
                    '19+Wagner.png',
                    '20+Hardage.png',
                    '21+Gilbert.jpg',
                    '22+John+Spencer.png',
                    '23+Walters.png',
                    '24+Breeland2.jpg',
                    '25+Harris.jpg',
                    '26+Duncanson.png',
                    '28+Williams.jpg',
                    '29+Knittle.jpg',
                    '30+Dave+Hammond.jpeg',
                    '31+Walborn+.png',
                    '32+Cowan.jpg',
                    '33+Hexburg.jpeg',
                    '34+Kieth+Penny.jpg',
                    '35+Lawson.png',
                    '36+Hammond.jpg',
                    '37+Woods.jpeg',
                    '38+Mortensen.jpg',
                    '39+Martin.png',
                    '40+Love+.jpeg',
                    '41+Wilson.jpg',
                    '42+Strader.jpeg',
                    '43+Valencia.jpeg',
                    '44+Veils.jpeg',
                    '45+Whitaker.jpeg',
                    '46+Klien.jpeg',
                    '47+Grasberger.jpg',
                    '48+Beerman+.png',
                    '49+Padilla+.jpeg',
                    '50+Wagner.png',
                    '51+Reynolds.jpg',
                    '52+Allen.png',
                    '53+Davis+.jpeg',
                    '54+Gates.jpeg',
                    '55+Webster.jpg',
                    '420243720_1524473624760317_6437778988742861386_n.jpg',
                ].map((image) => (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            key={image}
                            src={`/images/humbugery/${image}`}
                            className="w-full aspect-square object-cover"
                            alt={image}
                        />
                    </>
                ))}
            </div>
        </PageSection>
    );
}

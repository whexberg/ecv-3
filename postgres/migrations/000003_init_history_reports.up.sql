CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable UUID extension if not already enabled

CREATE TABLE IF NOT EXISTS history_reports
(
    id         UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    title      TEXT   NOT NULL,
    author     TEXT   NOT NULL,
    date       DATE                     DEFAULT CURRENT_DATE,
    tags       TEXT[] NOT NULL          DEFAULT '{}',
    body       TEXT   NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS history_reports_updated_at ON history_reports;
CREATE TRIGGER history_reports_updated_at
    BEFORE UPDATE
    ON history_reports
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();


INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('71bd4cd6-b4a7-43aa-aca3-dc1a7df87692',
        'Broken Collar Bone, Murder, and Two World Prizes, A Brief History of Auburn Brewery',
        'Mr. Kristian STILTS Grasberger XNGH',
        '2025-02-21',
        ARRAY ['history', 'serious shit'],
        'Shortly after the June fire of 1855, a brewery was erected by Samuel Kaiser. The capacity of the establishment is sufficient for the manufacture of four hundred gallons of ale and beer per day. A market for which is found through all the borders of Placer.

In 1868 the Kaiser brothers, Samuel and Frank, sold the business to Frank Lux, who in turn sold the brewery to Fred Grohs in 1874.

June 5, 1880, the old Auburn Brewery, long noted for the superior excellence of its product, has changed, F. Grohs, for a long time popular proprietor, having sold out to Mr. John Krauss and Mr. Jacob Roll.

The purchasers are both first class men, and are both old and experienced brewers, the former, Mr. Krauss, having served for some years as head brewer of this same establishment. They paid $10,500.

A year later Krauss sold his share to Jacob Roll for $6500 June 8, 1881. Due to earlier, Krauss and Roll has a physical altercation and Krauss sustained various injuries including a broken collar bone. The verdict reached at November 7, 1881, trial for the incident that had occurred on May 31, 1881, was that Jacob Roll would pay John Krauss $500 damages in addition to costs.

April 22, 1882, Julius Weber, who later would be murdered by his son, paid $7,000 to become a partner with Jacob Roll. Soon after Weber would by out Roll''s share.

January 2, 1896, Ferdinand Rechenmacher acquired the brewery from Julius Weber. Ferdinand Rechenmacher, won two World Prizes from his steam beer ..."

He advertised that Placer barley, Russian River hops, and spring water at the site made the beer special. In about 1908, when lager beer began to be produced, Rechenmacher felt it would be too expensive to compete and sold the brewery and went to produce beer in Truckee. He died in 1910.

Currently there are ten breweries and tap houses within Auburn, including Moonraker Brewing, Crooked Lane Brewing, Knee Deep Brewing, Auburn Alehouse, Rebellion Brewing, Moonraker Millhouse, Hillenbrand Farmhaus Brewery, Grass Valley Brewing Company, The Annex Tap Room & Provisions, and Two Ass Brewing.

WHAT SAY THE BRETHERN?');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('269f2317-eb2f-4070-8187-a78f19dd81a9',
        'Captain Jonathn Davis',
        'Mr. Kristian STILTS Grasberger XNGH',
        '2024-11-12',
        ARRAY ['history', 'serious shit'],
        '“Six feet one, in trousers and shirt,-Covered with sweat and blood, and dirt;-Not very much scared” (though his hat was hurt, And as full of holes as a garden -squirt);-Awaiting the onslaught, behold him stand- With a twelve-inch “Bowie” in either hand.-His cause was right, and his arms were long,- His blades were bright, and his heart was strong.

This ballad was written to tell of the heroics of Capt. Jonathan Davis, a veteran of the Mexican American War. The year was 1854 and the very early days of the Gold Rush where a man could leave a shovel on the ground as a claim or leave his rocker unguarded were long gone.

On December 19, 1854, Captain Jonathan Rutledge Davis, Dr. Bolivar Sparks and James McDonald were out prospecting for gold on an isolated trail in Rocky Canyon, today known as Ruck-a-Chucky Road. They were suddenly ambushed by a group of fourteen armed bandits. James McDonald fell dead before he could even draw his pistol. Dr. Sparks was a bit quicker on the draw and fired off two shots before he was severely wounded. The formidable Capt. Davis, however, instantly drew his two Colt revolvers and began a barrage of fire at the bandits. Within seconds, with deadly aim, seven of the bandits lay dead or seriously wounded.

With both parties out of ammunition, three of the surviving bandits pulled out Bowie knives and the forth brandished a short sword. They all lunged at Davis only to find he had his own Bowie knife. He stabbed one of the bandits to death, he disarmed another by knocking the knife from his grasp and slicing off his nose. Two more bandits advanced on the Captain only to be mortally stabbed. Three remaining outlaws fled the scene

Capt. Davis quickly tore his shirt into strips and began to bandage Dr. Spark’s wounds and even the wounds of the injured bandits. John Webster, Isaac Hart and P. S. Robertson from a group of fellow miners who had observed the whole shoot- out from a nearby hill helped tend to the wounded.  later that night three of the bandits died. Before he died, the leader of the group, the bandit who lost his nose in the fight confessed to the gang’s murder of Six Chinese and four Americans in the days right before they encountered Davis and his party. The next morning another of the bandits died and Capt. Davis and the miners buried all eleven of them in Rocky Canyon.  Davis himself had several flesh wounds and at least six bullets had passed through his hat and eleven more through his shirt and coat. The miners stripped the bandits of their ill- gotten loot, some $491 in gold and silver coin, two silver watches, seven gold watches and four ounces of gold dust. The miners all decided the plunder should go to Dr. Spark’s family after he passed on December 26th in his home in Coloma.

The Mountain Democrat published an extra edition to recount the tale. The story was quickly picked up by nearby newspapers and soon by newspapers all over the country. At first the story seemed so incredulous that many of the newspaper accounts thought it to be an exaggerated report. A brother – in- law of Dr. Sparks took it upon himself to find the three miners who witnessed the event. Along with eye-witnesses that recounted the events of the affair.

As the facts of the matter were set to rest, Jonathan Davis said, “I only did what hundreds of others might have done under similar circumstances and attach no particular credit to myself for it’.

WHAT SAY THE BRETHERN?');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('13e21e07-506e-49d2-8163-45992f376d9e',
        'Conviction of a Duelist',
        'Mr. Kristian STILTS Grasberger XNGH',
        '2024-02-16',
        ARRAY ['history', 'serious shit'],
        'On March 7, 1925 Daniel Morales and Zacharias Martinez employees of Gladding McBean Pottery Works in Lincoln got into a heated argument. Unable to resolve their differences they agreed to a duel.

The two men walked 2 to 3 miles out of town onto Fruitvale Road. Such a walk was customary to give both men time to reflect and perhaps rethink the duel, but neither man changed his mind.

Unlike duels of the past there were no seconds, no witnesses and when the shooting started each man fired several bullets. Both men took cover behind trees but their final shots were on target. Morales was shot in the chest while Martinez was fatally struck in the head.

Morales was taken to the Placer County hospital where Dr. Mackay reported he would likely survive. He was arrested for murder, but District Attorney Orin J. Lowell discovered he would have to try Morales under an old dueling statute, which carried a sentence of one to seven years.

Morales recovered from his wound and in September was tried for murder as the result of the duel.

On September 25, 1925, he was found guilty. According to the Auburn Journal it was the first murder conviction for a duelist in California since 1859. He was sentenced by Judge Landis to serve one to seven years in San Quentin Prison. He was discharged from Prison November 22, 1928.

The dueling statute was finally repealed by passage of a bill by the California State Legislature and signed into law by Governor Pete Wilson on July 20,1994.

WHAT SAY THE BRETHERN?');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('65ce1cf9-5ba0-46a1-801b-b21394e79259',
        'Great Train Robbery',
        'Mr. Kristian STILTS Grasberger XNGH',
        '2024-07-19',
        ARRAY ['history', 'serious shit'],
        'The Great Train Robbery was a famous and sensational crime that occurred in Roseville, California, on December 30, 1923. This incident involved the robbery of a Southern Pacific freight train in which over $225,000 (equivalent to approximately $3.5 million in today''s currency) was stolen. The robbers carefully planned the crime, using stolen identification to pose as Southern Pacific Railroad employees and gaining access to the train while it was stopped in the railyard.

The robbers used a system of signals to communicate with each other, and as the train was departing, they climbed aboard, overpowered the crew, and forced the engineer to stop the train at a prearranged location. They then uncoupled the locomotive and three baggage cars, which contained the cash, and made their getaway. They fled to San Francisco, where they eventually split up.

One of the robbers, Eugene Victor Debs, was arrested in 1924 and sentenced to 30 years in prison, but he managed to escape from Folsom Prison in 1928. He was recaptured in 1935 and sent to Alcatraz, where he served out his sentence.

The other robber, John F. Johnson, was never apprehended and remained a fugitive for the rest of his life, dying in 1966 without ever being caught.

The Great Train Robbery was one of the largest and most audacious crimes of its time, and it remains a legendary event in California history.

WHAT SAY THE BRETHERN?');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('2f7c175d-df09-47ef-bb76-e9ac38cb49e9',
        'James Marshall',
        '"KURTeous MAXIMVS"',
        '1998-02-20',
        ARRAY ['history', 'serious shit'],
        'LAST MONTH MARKED THE SESQUICENTENNIAL OF THE GOLD DISCOVERY AT COLOMA WHICH MADE THE SUBJECT OF THIS MONTH''S HISTORY REPORT SOMEWHAT OBLIGATORY

THIS WAS ORIGINALLY READ IN SEPTEMBER OF 1996

I HAVE ADDED SOME MATERIAL THAT I THINK WILL GIVE A LITTLE MORE INSIGHT INTO THE SUBJECT OF THIS MONTH''S DISSERTATION



# JAMES MARSHALL



JAMES WILSON MARSHALL WAS A DESCENDANT OF JOHN HART A SIGNER OF THE DECLARATION OF INDEPENDENCE.

Editor''s Note - Sometime we learn of occasional "inaccuracies" in a report.  Our appreciation goes out to our readership for keeping us "on our toes" - Slick

Apparently...James Wilson Marshall was NOT a descendant of John Hart, a signer of the Declaration of Independence.  He was a very distant cousin, a descendant in the John[3] Hart line, whereas Signer John was descended from the Edward[3] Hart line.  Indeed: Signer John was Edward''s son; James W. was a great-great-great-great-grandson of John[3].  James Wilson Marshall did NOT have any relationship to Justice James Marshall; they were of completely different families.

HE WAS ALSO RELATED TO JOHN MARSHALL THE SUPREME COURT JUSTICE.  HE HAILED FROM A TOWN CALLED LAMBERTVILLE N.J. WHERE HE IS STILL CONSIDERED THEIR FAVORITE SON. YOUNG WILSON WAS A WHEELWRIGHT.  BACK IN THOSE DAYS A GOOD CARPENTER DREAMED OF SOMEDAY BEING SKILLED ENOUGH TO BE ABLE TO MAKE WHEELS. AFTER A GREAT DEAL OF RAMBLING WHICH INCLUDED MISSOURI AND OREGON HE EVENTUALLY CAME TO SUTTER''S FORT WHERE THEY FOUND HE COULD MAKE OR FIX ANYTHING FROM SPINNING WHEELS TO FURNITURE.

AFTER TAKING A ROLE IN THE BEAR FLAG REBELLION MR. MARSHALL RETURNED TO THE RANCH HE HAD ESTABLISHED WITH THE WAGES HE HAD MADE WORKING FOR CAPTAIN SUTTER ONLY TO FIND IT HAD BEEN PILLAGED IN HIS ABSENCE.  HE HAD NO CHOICE BUT TO GO BACK TO WORK FOR THE GOOD CAPTAIN.

AT A PLACE NOT FAR FROM HERE CALLED COLOMA MR. MARSHALL''S JOB WAS TO CONSTRUCT A SAWMILL TO FURNISH BUILDING MATERIALS FOR SUTTERS GROWING EMPIRE. THE SAWMILL WAS TO BE RUN BY HARNESSING THE POWER OF THE AMERICAN RIVER USING A WATER DRIVEN WHEEL. AFTER A RATHER DISMAL TRIAL RUN IT WAS DETERMINED THAT MORE WATER WAS GOING TO HAVE TO COME THROUGH THE TAILRACE TO GET THE WHEEL TO TURN FAST ENOUGH TO BE ABLE  TO MILL ANY LUMBER. THE SOLUTION WAS TO DIG IN THE DAYTIME AND LET THE WATER RUN THROUGH AT NIGHT.    WHEN THE WATER SCOURED OUT THE TAILRACE, NATURALLY  GOLD WOULD GET CAUGHT IN THE FISSURES IN THE BEDROCK.  THAT MONDAY MARSHALL ORDERED THE HEAD GATE AT THE UPPER END OF THE DITCH SEALED OFF WITH LEAVES, DIRT AND SAW DUST, THUS ALLOWING NO WATER TO COME THROUGH.  NOW JAMES HAD A LITTLE KNOWLEDGE OF GEOLOGY AND HAD REMARKED IN HIS WRITINGS OF "BLOSSOM" (QUARTZ OUTCROPPINGS) IN THE AREA WELL BEFORE THE ACTUAL GOLD DISCOVERY DATE. WALKING THROUGH THE DITCH HE SPOTTED SOME "COLOR".  NOT WANTING TO BE EMBARRASSED, HE TESTED WHAT HE FOUND BY HITTING IT WITH A ROCK.  IT DID NOT SHATTER, AS FOOLS GOLD WOULD, AND THIS CONFIRMED HIS SUSPICIONS. HE WRAPPED HIS FINDINGS IN A HANDKERCHIEF AND TOOK THEM TO CAPTAIN SUTTER.

THIS WOULD HAVE BEEN GOOD NEWS EXCEPT THAT JOHN SUTTER HAD NO CLAIM TO THE LAND THAT THE SAW MILL WAS SITTING ON.  THE FACT IS, THE DISCOVERY OF GOLD PROVED TO BE A DISASTER FOR JOHANN AUGUSTUS SUTTER.  BECAUSE ALL OF HIS WORKERS AT THE FORT LEFT THEIR JOBS FOR THE GOLD FIELDS.  EVEN MARSHALL HIMSELF CAUGHT GOLD FEVER AND GAVE UP ON THE MILL AFTER ONLY TWO YEARS OF OPERATION.



JAMES WAS NOT AS LUCKY AS MOST PEOPLE THINK AND DID NOT BECOME RICH, JUST FAMOUS. ANYTIME  HIS IDENTITY WAS REVEALED SOMEONE WOULD ALWAYS BE ASKING HIS ADVICE OR FOLLOWING HIM AROUND LIKE HE WAS SOME SORT OF LATTER DAY KING MIDAS.  JAMES HAD NUMEROUS OTHER BUSINESS  VENTURES RANGING FROM FARMING AN APPLE ORCHARD TO WINE MAKING TO SELLING HIS AUTOGRAPH FOR .25 A COPY. JAMES  APPLIED FOR AND GOT A STIPEND FROM THE STATE OF CALIFORNIA.  EVENTUALLY MR. MARSHALL LOST THIS GRANT WHEN IT BECAME OBVIOUS THAT HE HAD ALLOWED ALCOHOL TO BECOME HIS MASTER.

ON AUGUST 10, 1885 JAMES WILSON MARSHALL DIED PENNILESS.

IN TIME A MONUMENT WAS BUILT OVER HIS GRAVE IN COLOMA THAT PORTRAYS MARSHALL WITH A GOLD NUGGET IN ONE HAND AND POINTING TO THE GOLD DISCOVERY SITE WITH THE OTHER.


WHAT SAY THE BRETHREN!

FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('b4bda292-9f61-4388-b89b-cd178bd2a3a3',
        'Judge Roy Bean',
        '"KURTeous MAXIMVS" XNGH',
        '2002-02-15',
        ARRAY ['history', 'serious shit'],
        '# JUDGE ROY BEAN

ROY BEAN WAS A SALOON KEEPER WHO LIKED AN ORDERLY GAMBLING HOUSE

HE WAS ALSO A FAN OF AN ACTRESS NAMED LILY LANGTRY SO MUCH SO THAT HE NAMED

HIS TOWN LANGTRY TEXAS AND HIS SALOON WAS KNOWN AS THE JESEY LILLY IN HER HONOR



THE JUDGE WAS BORN A KENTUCKIAN AND  HAD LED AN INTERESTING LIFE.

HE’D BEEN A SMUGGLER AND A BARTENDER AS WELL AS A MECANTILE TRADESMAN AND SET HIMSELF UP AS JUDGE OF THE LAWLESS LITTLE RAILROAD TOWN THAT HE HIMSELF NAMED

HE WOULD PRESIDE IN HIS SALOON/COURTROOM AND HEAR CASES WHILE TENDING BAR. OFTEN HE WOULD RECESS THE COURT SO THAT HE MIGHT SELL THE JURY, LAWYERS AND DEFENDANT A ROUND OF DRINKS



THE JUDGE ROY BEAN OF HISTORY LOOKED VERY LITTLE LIKE THE PAUL NEWMAN HOLLY WOOD VERSION

IN REAL LIFE JUDGE BEAN WAS A LARGE MAN WITH A WHITE BEARD AND HAD LITTLE USE FOR STATUTES THAT DIDN’T BENEFIT HIM PERSONALLY

OUT OF NECESSITY (THE NECESSITY BEING THAT GAMBLERS TEND TO DRINK AND DRINKERS TEND TO GAMBLE) IN 1882 AT THE AGE OF 56 HE BEGAN INTERPRETING THE LAW AT LEAST AS MUCH OF THE LAW THAT AFFECTED HIM AND THE JERSEY LILLY

THUS BEGAN A LEGENDARY CARRER THAT WOULD SPAN TWENTY YEARS

BECAUSE OF THE FACT THAT THE NEAREST REAL COURT WAS AT LEAST TWO HUNDRED MILES AWAY THE TEXAS RANGERS BEGAN TO BRING THEIR PRISONERS TO THE SELF-STYLED MAJISTRATE WHO BILLED HIMSELF AS THE LAW WEST OF THE PECOS.

THIS WAS EVEN BEFORE THE STATE OF TEXAS HAD RECEOGNIZED HIM AS A JUSTICE OF THE PEACE.

THE JUDGE WAS COLORFUL AS WELL AS PRAGMATIC

HE WOULD FINE DEFENDANTS BASED ON THEIR ABILITY TO PAY AND EVEN FINED A CORPSE FORTY DOLLARS FOR CARRYING A CONCEALED WEAPON.

ANOTHER STORY TOLD OF WHEN AN IRISH RAILROAD WORKER HAD BEEN ACCUSED OF KILLING A CHINESE MAN.

THE COURT ROOM/SALOON FILLED WITH OVER A HUNDRED ROUGH EDGED IRISH COWORKERS EAGER TO SEE THEIR COMPATRIOT GET A FAIR TRIAL

THE ALWAYS COOL ROY BEAN CONSULTED HIS LAWBOOKS FOR SOME MINUTES BEFORE SUMMARIZING THAT ALTHOUGH THERE WERE NUMEROUS LAWS ON THE BOOKS CONCERNING HOMICIDE THERE WERE NONE THAT PROHIBITED THE KILLING OF CHINESE… CASE DISMISSED

ALL FINES THAT HE LEVYED WENT RIGHT INTO HIS POCKET AND WHEN QUESTIONED ABOUT THIS PRACTCE BY OFFICIALS FROM THE STATE OF TEXAS HIS ANSWER WAS “MY COURT IS COMPLETELY SELF SUSTAINING”



WHAT SAY THE BRETHREN!

FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('be206f07-58a9-4b8f-9950-29fadd8aa22e',
        'More - Plurality',
        '"KURTeous MAXIMVS" XNGH',
        '2000-02-18',
        ARRAY ['history', 'serious shit'],
        '# PLURALITY

AS THE PRESIDENTIAL PRIMARIES HEAT UP IT BECOMES NECESSARY TO THINK BACK TO LESSONS THAT PREVIOUS ELECTIONS HAVE TAUGHT US SPECIFICALLY IN THE MATTER OF PLURALITY.

WHEN EVER SOMEONE WINS AN ELECTION WITH LESS THAN 50% OF THE VOTE THIS IS KNOWN AS WINNING BY A PLURALITY.

THIS IS THE CONSEQUENCE WHEN A SUBSTANTIAL PERCENTAGE OF THE POPULATION GETS FED UP WITH THE TWO PARTY SYSTEM

THE REASON I''M BRINGING THIS UP IS THAT DURING THE LAST TWO PRESIDENTIAL ELECTIONS THE CONSERVATIVE VOTE HAS BEEN SPLIT BY A THIRD PARTY CANDIDATE WITH THE MAN HAVING THE MOST VOTES WINNING NOT BY A MAJORITY BUT BY A PLURALITY.

THERE HAVE BEEN SOME VERY INTERESTING RESULTS OVER THE LAST 225 YEARS WHEN SIMILAR CIRCUMSTANCES HAVE DETERMINED WHO WOULD WEAR PRESIDENTIAL PANTS SO TO SPEAK.

AMERICANS SEE POLITICIANS AS OPPORTUNISTIC SCOUNDRELS, HUMBUGS IF YOU WILL.

THIS IS NOT NEW. EVENTUALLY WE AS A NATION GET SO FED UP THAT EVERY THIRTY  YEARS OR SO THE POLITICAL CLIMATE BECOMES RIGHT FOR A THIRD PARTY TO EMERGE FROM THE CACOPHONY TO MAKE A TRY FOR THE OVAL OFFICE.

WHEN THIS PHENOMENA FIRST TOOK WING IT USUALLY SIGNALED THE BEGINNING OF THE END OF ONE OF THE EXISTING PARTIES IN POWER. BACK IN THOSE DAYS POLITICAL CORRUPTION SOMETIMES BROUGHT DOWN AN ENTIRE POLITICAL DYNASTY

PARTIES SUCH AS THE FEDERALISTS AND THE WHIGS ARE PRIME EXAMPLES.

THE LAST TIME HISTORY WAS AFFECTED BY A THIRD PARTY CANDIDATE TO SUCH A DEGREE WAS WHEN STROM THUMOND RAN AS A DIXIECRAT IN 1948

IF IT HADN''T BEEN FOR SENATOR THURMOND TAKING THE SOUTH THOMAS DEWEY WOULD HAVE BEEN THE THIRTY FOURTH PRESIDENT OF THE UNITED STATES

IN 1912 THE RACE WENT TO WOODROW WILSON EVEN THOUGH THE DEMOCRATS HAD FAILED TO TAKE A MAJORITY.

IF IT HADN''T BEEN FOR A DARK HORSE CANDIDATE NAMED TEDDY ROOSEVELT A MAN WHO WAS ALREADY AN EX-PRESIDENT, WILLIAM HOWARD TAFT WOULD HAVE BEEN RE-ELECTED TO THE WHITE HOUSE AND WOODROW WILSON WOULD HAVE BEEN JUST A FOOT NOTE IN HISTORY.

BY FAR THE MOST FAMOUS THIRD PARTY CANDIDATE WAS ABRAHAM LINCOLN HIS REPUBLICAN PARTY SO NAMED BECAUSE THEIR SOLE REASON FOR BEING WAS TO THWART WHAT WAS KNOWN AS SECESSIONISTS. THE SECESSIONISTS WANTED TO SEE THE NATION DIVIDED INTO TWO SEPARATE COUNTRIES.

LINCOLN WON THE ELECTION WITH JUST UNDER FORTY PERCENT OF THE POPULAR VOTE

IN 1824 ANDY JACKSON APPARENTLY DEFEATED INCUMBENT JOHN QUINCY ADAMS, WILLIAM CRAWFORD, AND HENRY CLAY TO ASCEND TO THE HIGHEST OFFICE IN THE LAND HOWEVER SINCE THIS RESULT WAS UNPRECEDENTED THE HOUSE OF REPRESENTATIVE TOOK A VOTE AND DETERMINED JOHN QUINCY ADAMS TO BE THE VICTOR. ANDREW JACKSON WENT ON TO WIN THE NEXT ELECTION QUITE HANDILY AND HENRY CLAY BECAME THE NAME OF A VERY FINE BRAND OF CIGAR.



WHAT SAY THE BRETHREN!

FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('ef036e82-aa96-44f4-a3d9-69c09d438ab7',
        'Murders Bar',
        'Mr. Kristian STILTS Grasberger XNGH',
        '2024-06-21',
        ARRAY ['history', 'serious shit'],
        'It is still known as Murderer’s Bar, just as it was in 1849 when, in late April, six or seven miners from Oregon prospected up the Middle Fork of the American River until they found a rich strike just below a waterfall. They decided to stay and mine so several of them left to buy supplies in Coloma. One story says that Indians had been camped nearby and undue liberties with their women had been taken, but whatever the reason, when the men who left camp returned, they found their companions dead while the gold they had mined was still there. The men rushed back to Coloma and accused the local Indians, many working for John Sutter and James Marshall, of the foul deed. A large number of innocent natives were eventually killed in the El Dorado Indian War that followed.

At about this time Captain Ezekiel Merritt, Thomas Bruckner and an Indian boy named Peg also were working their way upstream on the middle fork when they came on a plundered camp and an ash heap that held still unburned human bones. The next day, just past a rocky point along the river below the waterfall, sixty or so well armed Indians appeared but there was no fight and after several hours the Indians filtered back into the forest. Bruckner took his knife and carved the name ‘Murderer’s Bar’ into an alder tree and the three crossed the stream to another more defensible sand bar and set up camp. Here they found more gold and determined to stay. The Indians never returned and by June the area teemed with miners.

Summer 1850 saw 1500 men working below the falls and finding from half an ounce to several pounds of gold a day, but the bed of the river was known to yield several ounces of gold to the pan. The miners of Sailor’s Claim, Murderer’s, Bruckner’s, New York and Vermont Bars all joined together to build a giant flume to carry the river’s water and leave its bottom free for mining. After much hard work the structure was finished on a Saturday in early September. The men decided to wait until Monday to begin gold recovery, but Sunday morning two men who could not wait slipped into the stream bed and found nine and a half pounds of gold before breakfast. At $35.10 per ounce totaling $5335,20 equaling $201,881.84 in 2024.

Black clouds rolled in later that day and high in the Sierra torrents of rain fell. By Monday water cascaded down the river, swamped the flume and rushed over the dam until the whole structure gave way, with the flume washing several miles downstream before breaking apart.

The flood of 1850 was long remembered in the mines.

WHAT SAY THE BRETHERN?');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('8a3bcbb3-321d-4c11-ab06-8d578988fea3',
        'Old Joe',
        'Mr. Kristian STILTS Grasberger XNGH',
        '2024-12-20',
        ARRAY ['history', 'serious shit'],
        'Old Joe "Everybody liked that horse"

The stage coach era lasted much long than one might imagine given the rough and steep terrain in our county. In 1901 John McAnich of Auburn was still running the Auburn, Colfax and Forest Hill Stage Line. On July 3rd, driver Henry Crockett was heading to Forest Hill with passengers, a Wells Fargo box and a load of ice cream for the July 4th celebration the next day. Henry’s team was led by “Old Joe” his favorite horse. The stage route was a difficult one and it was said that no one knew the route better than Old Joe. Passengers felt safe with him at the lead.

About seven miles from Forest Hill, after a step 10-mile climb, a lone robber stopped the stage. He wore a mask and had sacks on his feet and carried a double-barreled shotgun. The bandit ordered Crockett to throw out the Wells Fargo express box. Crockett is reported to have replied “Ah, go on, you’re joshing.” Some reports say he said “you must be foolin”. Without a word, the robber shot Old Joe, killing him instantly. Crockett (again reportedly) shouted “You son of a Bitch, you’ve killed the best damn lead horse there is.” Crockett threw out the box that contained about $70 and the bandit collected about $7.00 from the passengers. The bandit was never caught though he was later identified as Henry Wise, a former resident of Forest Hill who have served time in an Arizona jail for stage robbery.

On July 5th a group from Forest Hill came out to bury Old Joe. They put him in a sluice cut near the spot that he had died. About a year later Forest Hill residents placed a large slab of slate at the site to commemorate his passing. It was said that every fourth of July Forest Hill residents put a flag on Old Joe’s monument. In the 1930’s the slate slab was stolen and Ruhkala Monument Company of Rocklin donate a granite tombstone, when the Foresthill Road was widened in the 1990’s, Old Joe was moved and in 2001 the Naïve Sons of the Golden West erected a new monument with a wagon wheel atop it. Residents still frequently leave flags and flowers at Joe’s grave site

WHAT SAY THE BRETHERN?');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('9e83af26-6640-4ee5-80ea-970259e72671',
        'Outlaw Doctor',
        'Mr. Kristian STILTS Grasberger XNGH',
        '2024-03-15',
        ARRAY ['history', 'serious shit'],
        '“Dear mother I am about to make my exit to another country I take this opportunity to write you a few lines. Probably you may never hear from me again. If not, I hope we may meet where parting is no prodigal career in this country. I’ve always recollected your fond admonitions, and if I had lived up to them, I would have not been in the present position; but dear mother, though my faith has been a cruel one, yet I have no one to blame but myself”, These were the words of Tom Bell prior to his death.

Born Thomas J. Hodges in Rome, Tennessee, he saw action in the Mexican–American War as a surgeon. Following the war he traveled to California during the California Gold Rush, but was unsuccessful as a prospector, later drifting around California as a gambler and as a doctor at times for several years. The outlaw "Doc Hodges" was arrested for stealing eleven mules. When he was arrested in 1855, wanting to confuse the peace officers, he gave the name Tom Bell, a small-time cattle rustler. In 1855 he was serving time in Angel Island Prison for robbery when he met Bill Gristy and successfully escaped several weeks later. He escaped with the help of his profession as a doctor by faking a severe illness that fooled the prison doctor, which allowed him to escape. With Gristy, Bell formed an outlaw gang of five men that grew to fifty with Bell planning and sending out teams robbing stages for several months from their hideout in the foothills near Auburn.

On August 12, 1856, after their spy spotted the Camptonville-Maryville stage carrying $100,000 (~$2.55 million in 2024) worth of gold bullion, the gang unsuccessfully attempted to rob it. In an exchange of gunfire, a woman passenger was killed and two male passengers were wounded before the gang was driven off by the stagecoach guards. The slain female passenger was a black woman by the name of Mrs. Tilghman, the wife of a popular barber from Maryville.

The robbery and death of the woman passenger angered citizens, and both a sheriff''s posse and citizen vigilantes conducted a massive search for the gang. October 4, 1856, an impromptu posse commanded by Judge George Gordon Belt, a Merced River rancher, and his deputies snuck up on bell leveled their guns at him as Judge Belt Sayed “I believe you’re the man we have been looking for” “Very Probably” Bell replied. The posse decided that Bell was unworthy of due process and were to hang him Vigilante style. Prior to his hanging Judge Belt allowed Bell a drink of whiskey and to say his final words. Bell lifted the bottle to the men and stated “I have no bitterness toward anyone of you” with that Bell then read his letter to his mother aloud.

Judge Belt took possession of the letter Bell wrote which was later printed in the San Francisco Alta paper. Readers reacted sympathetically to his letter to his mother, but his second letter prompted controversy. It was to his mistress a Mrs, Elizabeth Hood who harbored the outlaw on number of occasions. He proclaimed his innocence stating “I have been betrayed. I am accused of every robbery that has been committed for the past twelve months, which is entirely false. I have never committed but three robberies. I am to die like a dog.”

From all other accounts during the spring and summer of 1856 rarely a night had passed without a resident of the Gold Country finding themselves staring down Tom Bells revolver while being relieved of their money or livestock.

WHAT SAY THE BRETHERN?');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('ade4442e-75a0-433a-9994-51d4b7305dd6',
        'Plurality',
        '"KURTeous MAXIMVS" XNGH',
        '2000-02-18',
        ARRAY ['history', 'serious shit'],
        '# PLURALITY

AS THE PRESEDENTIAL PRIMARIES HEAT UP IT BECOMES NECESSARY TO THINK BACK TO LESSONS THAT PREVIOUS ELECTIONS HAVE TAUGHT US SPECIFICALLY IN THE MATTER OF PLURALITY.

WHEN EVER SOMEONE WINS AN ELECTIN WITH LESS THAN 50% OF THE VOTE THIS IS KNOWN AS WINNING BY A PLURALITY.

THIS IS THE CONSEQUENCE WHEN A SUBSTANTIAL PERCENTAGE OF THE POPULATION GETS FED UP WITH THE TWO PARTY SYSTEM

THE REASON I''M BRINGING

WHAT SAY THE BRETHREN!

FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('58771d8c-f38f-49bd-9ada-d91856faff43',
        'Queho',
        '"KURTeous MAXIMVS" XNGH',
        '2001-02-16',
        ARRAY ['history', 'serious shit'],
        '# QUEHO

QUEHO WAS ONE OF THE MOST NOTORIOUS OUTLAWS THAT EVER INHABITED THE STATE OF NEVADA

HE WAS BORN TOA WOMAN OF THE COCOPAH TRIBEAROUIND 1880.

HIS FATHERS IDENTITY IS A MYSTERY.

QUEHO WAS AN OUTCAST AMONG THE NATIVE AMERICANS PARTLY BECAUSE HE WAS BORN WITH A CLUBFOOT AND PARTLY BECAUSE OF HIS QUESTIONABLE PARENTAGE

HE GREW UP IN LAS VEGAS ON THE INDIAN RESERVATION

ALTHOUGH THE STORY ON HOW HE BEGAN HIS LIFE OF LAWLESSNESS DIFFER WITH EACH STORY TELLER,

IT IS GENERALLY AGREED THAT HE PROBABLY KILLED ANOTHER INDIAN NAMED HARRY BISMARK DURING A DRUNKEN FIGHT. IT HAS ALSO BEEN REPORTED THAT HE KILLED TWO OTHER MEN WHILE MAKING HIS ESCAPE.

HE DID HOWEVER ASSAULT A SHOP OWNER NAMED HY BOHN WHILE STOCKING UP FOR HIS GETAWAY

HE FLED INTO THE MOUNTAINS TO THE GOLDBUG MINE WHERE HE KILLED SPECIAL DEPUTY “DOC” GILBERT. DOC HAD BEEN SHOT IN THE BACK AND HIS SPECIAL DEPUTY BADGE No. 896 HAD BEEN STOLEN.

FROM THAT DAY FORWARD ANY UNSOLVED CRIME WAS ATTRIBUTED TO QUEHO. OFTEN TRACKS THAT COULD ONLY BELONG TO A MAN WITH A CLUBFOOT WERE FOUND AT  CRIME SCENESWHERE SOMEONE HAD BEEN  MURDERED FOR SUPPLIES.

THROUGHOUT HIS LIFE OF CRIME THE LAW WAS ALWAYS ONE STEP BEHIND HIM.

IT IS SAID THAT TWENTY-THREE PEOPLE WERE MURDERED BY QUEHO BETWEEN 1897 AND 1919 AND THE REWARDS FOR HIS CAPTURE TOTALED MORE THAN THREE THOUSAND DOLLARS

THIS WAS BACK IN THE DAYS WHEN TWO DOLLARS A DAY WAS WORKMAN’S WAGES.

HUNDREDS SEARCHED FOR QUEHO BUT NO ONE EVER FOUND HIM.

PARENTS USED TO SCARE THEIR CHILDREN BY TELLING THEM THAT QUEHO WOULD GET THEM IF THEY DIDN’T WATCH OUT

IN FEBRUARY OF 1940 TWO PROSPECTORS FOUND QUEHO’S MUMMIFIED REMAINS IN A CAVE IN BLACK CANYON NEVADA INCLUDED WITH THE BODY WERE ARTICLES OF CLOTHING COOKING UTENSILS AND A SPECIAL DEPUTY BADGE No.896



WHAT SAY THE BRETHREN!

FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('860bf8a7-827f-4e85-bd32-5d9dcba1dd28',
        'The Chapters of E Clampus Vitus',
        '"KURTeous MAXIMVS"',
        NULL,
        ARRAY ['history', 'serious shit'],
        '# THE CHAPTERS OF E CLAMPUS VITUS

### parts one through five*

<br/>
<br/>

* EDITOR''S NOTE: These  are a series of valuable writings that have been presented at LSD #3''s general meetings by Kurteous Maximus beginning back in October 1996, so don''t go bitching that the info is old.   -  Slick



IN THE SIX YEARS SINCE I WAS TAKEN IN I HAVE TRAVELED TO THE FARTHEST REACHES OF "CLAMPERDOM" AS IT IS OFTEN TIMES CALLED.  IN MY TRAVELS I''VE  MET COUNTLESS REDSHIRTS FROM ALL WALKS OF LIFE AND BEING THE CURIOUS FELLOW THAT I AM I ALWAYS ASK THE SAME STUPID QUESTION..."WHAT THE HELL MADE YOU GUYS NAME YOUR CHAPTER THAT? "EACH AND EVERY CHAPTER HAS IT''S OWN STORY TO TELL. SOMETIMES IT''S THE ORIGINAL NAME OF THE TOWN OR CAMP THAT WAS TOO LONG TOO RACY OR JUST TOO HARD TO PRONOUNCE. IN SOME CASES IT''S AN HISTORICAL PERSONAGE THAT THE PROPER, STODGY TYPES WOULD RATHER FORGET. ACCORDINGLY I HAVE COMPILED A SOMEWHAT ABBREVIATED LIST OF THE OFFICIAL, THE UNRECOGNIZED AND THE OUTLAWED.

YOU MUST REALIZE THAT WHEN THIS ALL BEGAN THE GNR WAS JUST A PHONY TITLE AND THE PHRASE "AND SO RECORDED" WAS A JOKE , BECAUSE NO ONE WAS IN ANY CONDITION TO WRITE ANYTHING DOWN AND AFTERWARD THERE WASN''T ANYONE WHO COULD REMEMBER WHAT THE MEETING WAS ABOUT. JUST ABOUT EVERY MINING CAMP HAD A "HALL OF COMPARATIVE OVATIONS" ( WHICH WAS A EUPHEMISM FOR A SALOON) AND A FEW  BROKE BUT THIRSTY MINERS WHO WERE MORE THAN HAPPY TO  ASSIST IN THE PROCESS INVOLVED WITH SEEING A FOOL AND HIS MONEY PART COMPANY. THEREFORE MOST OF THE ORIGINAL LODGE NAMES (WHEN THEY HAD ONE) ARE LOST TO HISTORY.



# YERBA BUENA CHAPTER ONE

THE SPANISH FIRST CALLED THE AREA AROUND WHAT WAS TO BECOME THE MISSION SAN FRANCISCO YERBA BUENA MEANING "GOOD GRASS" THIS WAS IN REFERENCE TO GRAZING THEIR HORSES. YOU SEE BACK THEN IF YOU DIDN''T HAVE A HORSE, YOU WEREN''T SHIT. THEREFORE THE CONQUISTADORS  WERE CONSTANTLY ON THE LOOKOUT FOR SOME YERBA BUENA.  BECAUSE AS ALWAYS GOOD GRASS IS HARD TO FIND



# DE LA GUERRA Y PACHECO CHAPTER 1.5

THE CHAPTER THAT INHABITS THE COASTAL COUNTIES OF SAN LUIS OBISPO AND SANTA BARBARA IS ALSO THE NEWEST.

STATE  SENATOR PABLO DE LA GUERRA WAS A CLAMPER. WHICH MAY COME AS NO SURPRISE TO SOME FOR AT ONE TIME JUST ABOUT EVERYONE WHO JOINED THE STATE LEGISLATURE WAS SOMEWHAT OBLIGATED TO JOIN THE CLAMPERS AS WELL. THAT IS IF HE WANTED TO HAVE ANY LEGISLATION THAT HE AUTHORED TAKEN SERIOUSLY BY HIS FELLOW SOLONS.

IT SEEMS THAT THE HONORABLE SENATOR AUTHORED A SOMEWHAT SELF-SERVING BILL WHICH WOULD ALLOW THE MEMBERS OF THE E CLAMPUS VITUS TO USE THE STATE CAPITOL BUILDING FOR THEIR MEETINGS WHEN THE LEGISLATURE WAS NOT IN SESSION. THIS SOUNDED FINE TO THE SENATE WHERE IT PASSED QUITE HANDILY HOWEVER IT MISSED THE GOVERNORS DESK BY ONE VOTE IN THE ASSEMBLY. RUMOR HAS IT THE ONE VOTE NEEDED WAS THAT OF A DISGRUNTLED POLITICO WHO WAS WASHED OUT OF THE INITIATION OR BLACKBALLED AS THEY USED TO SAY.

NEVER THE LESS PABLO DE LA GUERRA''S BILL THOUGH TABLED,

IS STILL CONSIDERED ACTIVE LEGISLATION A HUNDRED  YEARS LATER

NOW THE OTHER PART OF THIS CHAPTERS BICAMERAL NOMENCLATURE REFERS TO A MILITARY FOOTNOTE IN CALIFORNIO HISTORY IN WHICH A CERTAIN COLONEL PACHECO LED A HEROIC CHARGE AGAINST A VASTLY SUPERIOR FORCE FROM MEXICO AND DESPITE THE FACT THAT THEY WERE OUTGUNNED AND OUTNUMBERED MANAGED TO GET CUT DOWN LIKE SHEEP.



# PLATRIX CHAPTER TWO

QUEEN OF THE COW COUNTIES

IN THE  SACRED RITUAL OF ECV ONE OF THE SPEAKING PARTS IS THE ROYAL PLATRIX THAT''S THE GUY WHO ACTUALLY BRINGS THE PBC''s INTO THE HALL AND LATER ASKS THE ETERNAL QUESTION,"WOULD YOU THEN MOUNT HER, KNOWING FULL WELL SHE DID NOT BELONG TO YOU?

NOW IF WE LOOSELY ANALYZE THE WORD IT MIGHT  BE A CORRUPTION OF THE LATIN WORDS PLAT WHICH MEANS FLAT AND THE WORD MATRIX WHICH JUST HAPPENS TO MEAN WOMB....WELL ANYONE WHO''S EVER BEEN TO LOS ANGELES WOULD SAY THAT SEEMS TO BE AS GOOD A DESCRIPTION OF THEIR TERRITORY AS ANY OTHER



# LORD SHOLTO DOUGLAS CHAPTER THREE

IRREFUTABLY THE MOST CELEBRATED INITIATION THAT EVER TRANSPIRED WAS THAT OF JAMES EDWARD DOUGLAS AN ENGLISH IMPRESARIO OF BUT FOUR AND TWENTY YEARS WHO GOT THE LAST LAUGH WHEN THE OUTFIT HE WAS "TAKEN IN" BY, THE KING SOLOMON LODGE NUMBER No 107, 306 EVENTUALLY FOLDED DUE TO THE HUGE AMOUNT OF PUBLICITY THAT IMMEDIATELY FOLLOWED HIS  RATHER THOROUGH INSTALLATION THEREBY CAUSING AN INSURMOUNTABLE SHORTAGE OF SUCKERS.



# QUIVIRA CHAPTER FOUR

I''M NOT ALTOGETHER TO SURE ABOUT THIS ONE BUT I THINK IT WAS EITHER A LOST INDIAN CIVILIZATION NEAR SANTA FE,  OR  A VAST EMPIRE CLAIMED BY THE SPANIARDS BUT IT PROBABLY DOESN''T MATTER BECAUSE THEY''RE NOT RECOGNIZED BY THE GRAND COUNCIL ANYWAY SO FUCK IT



# NEW HELVETIA CHAPTER FIVE

HAVING RECEIVED A LAND GRANT FROM THE MEXICAN GOVERNMENT THE MAN KNOWN AS JOHANN AGUSTUS SUTTER A SWISS , CALLED HIS SETTLEMENT NEW HELVETIA WHICH TRANSLATES TO NEW SWITZERLAND THE AMERICAN SETTLERS OF THE TIME JUST CALLED IT SUTTER''S FORT.

CHAPTER FIVE''S TERRITORY ENCOMPASSES THE ENTIRE AREA  NOW CALLED SACRAMENTO COUNTY WITH THE EXCEPTION OF A NARROW STRIP OF LAND IN OLDTOWN. AN EASEMENT IF YOU WILL, THAT THE LSD DRILL TEAM AND PARADE CONTINGENT MARCHES ON EVERY ST. PATRICK''S  DAY



# PRESIDENT WALKER CHAPTER SIX

THERE USED TO BE A CHAPTER IN SAN DIEGO NAMED AFTER  WILLIAM WALKER WHO WITH BACKING BY CORNELIUS VANDERBILT OVERTHREW THE GOVERNMENT OF NICARAGUA SOME TIME DURING THE 1850s AND MADE HIMSELF PRESIDENT. HIS TERM OF OFFICE TURNED OUT TO BE FOR LIFE BECAUSE AFTER THREE YEARS HE HIMSELF WAS OVERTHROWN AND SUBSEQUENTLY SHOT BY FIRING SQUAD



# CAPTAIN JACK CHAPTER SEVEN

THIS WAS THE ALTURAS LODGE.  CAPTAIN JACK WAS, IN THE WORDS OF MICHAEL BROWN "THE BADDEST MODOC THERE EVER WAS."FOR THREE YEARS CAPITAIN JACK AND HIS BRAVES KEPT THE U.S. ARMY COMPLETELY PARALYZED THROUGH HIT AND RUN ATTACKS THAT TOOK ADVANTAGE OF THE VOLCANIC CAVES OR "LAVA TUBES" THAT PERMEATE THE MOUNTAINS OF THE REGION. WHEN THEY FINALLY CAME TO THE TRUCE TABLE THE MILITARY MUCK-T-MUCK IN CHARGE HAD CAPTAIN JACK AND ALL OF HIS MINIONS FED POISONED STEW.



# FLOATING WHANG CHAPTER EIGHT

THE INFAMOUS WHANG CHAPTER WAS NAMED AFTER THAT CLAMPOTENT ORIENTAL SAGE AND NAVIGATOR LOW HUNG WHANG SO NATURALLY THEIR TERRITORY WAS THE PACIFIC OCEAN AND ALL THE ISLANDS IN IT. EVENTUALLY THEIRS BECAME A SUPER SECRET SUBSECT THAT REQUIRED P.B.C.s TO HAVE ALREADY ACQUIRED A REDSHIRT ELSEWHERE. WELL APPARENTLY THE GRAND COUNCIL WAS NOT AMUSED AND JERKED THEIR CHARTER A COUPLE OF YEARS BACK. I PERSONALLY LIKE TO THINK THAT THIS RECENT TURN OF EVENTS HASN''T SLOWED THEM DOWN ONE BIT



# PLUMAS DEL ORO CHAPTER EIGHT

FROM THE SPANISH "FEATHERS OF GOLD" WHEN THEY FIRST SAW THE DUCK DOWN FLOATING ON THE SURFACE OF THE WATER THE SPANISH EXPLORERS KNEW THAT A FINE MEAL COULD BE FOUND UPSTREAM SO THEY CALLED THAT PARTICULAR TRIBUTARY  THE FEATHER RIVER. THIS CHAPTER''S TERRITORY IS ALL OF PLUMAS COUNTY WITH THE EXCEPTION OF THE TOWN OF RABBIT CREEK BUT THAT''S ANOTHER STORY



# BILL MEEK CHAPTER NINE

WILLIAM "BULL" MEEK WAS A MULE SKINNER , TEAMSTER AND WELLS FARGO AGENT BUT HE WAS MOST KNOWN FOR HIS ABILITY TO SPIN A YARN AS THEY USED TO SAY. I GUESS IT''S SAFE TO SAY THAT TRUCK DRIVING AND BULLSHITTING  HAVE ALWAYS GONE HAND IN HAND. IF THAT WASN''T ENOUGH HE WAS ALSO AN X-HUMBUG, SO THERE CAN BE LITTLE DOUBT AS TO WHY HIS NICKNAME WAS "BULL"

APPARENTLY THIS CHAPTER CHANGED THEIR NAME AND THEIR NUMBER SOMEWHERE ALONG THE LINE AND THEN CONSOLIDATED WITH THE WILLIAM STEWART CHAPTER IN 1962 THEREBY BECOMING



# Wm. "BULL" MEEK -Wm. MORRIS STEWART CHAPTER TEN

THIS IS THE LARGEST CHAPTER IN THE MOTHERLODE CONTROLLING

YUBA, SUTTER AND MOST OF NEVADA COUNTY AS WELL AS A TOWN IN BUTTE CO.

WILLIAM MORRIS STEWART WAS THE FIRST U.S. SENATOR FROM THE STATE OF NEVADA HE WAS ALSO THE AUTHOR OF THE FIFTEENTH AMENDMENT TO THE CONSTITUTION AND A PRETTY FAIR BULLSHITTER HIMSELF AFTER ALL HE WAS A LAWYER



# JOAQUIN MURRIETA CHAPTER THIRTEEN

ON THE THIRTEENTH OF APRIL 1850 A LAW WAS PASSED BY THE STATE OF CALIFORNIA ALSO KNOWN AS "THE GREASER ACT" IT TAXED ALL FOREIGN BORN MINERS TWENTY DOLLARS A MONTH.  THIS EFFECTIVELY MEANT THE CHINESE AND THE MEXICANS. NOW THIS LAW HAD LITTLE REAL IMPACT ON THE CHINESE BECAUSE FIRST OF ALL THEY WERE ALREADY PAYING PROTECTION MONEY TO THE TONGS ANYWAY AND SECONDLY THEY HAD A HABIT OF WORKING CLAIMS COLLECTIVELY MEANING THEY WOULD HAVE AS MANY AS THIRTY PEOPLE WORKING ONE CLAIM SO THE FOREIGN MINERS TAX PROVED NO REAL BURDEN TO THEM.

HOWEVER THE MEXICANS AND MOST PARTICULARLY THE CALIFORNIOS WERE NOT AT ALL HAPPY  WITH THIS ARRANGEMENT THEY WERE BORN IN CALIFORNIA BUT THEIR INABILITY TO SPEAK ENGLISH MADE IT DAMN NEAR IMPOSSIBLE TO PROVE IT.

SOMETIMES THE TAX TURNED OUT TO BE MORE THAN A PARTICULAR CLAIM WAS WORTH.

NOW WHAT WOULD YOU DO IF SOMEONE TOOK OVER YOUR HOMELAND AND THEN TAXED YOU SIMPLY BECAUSE YOU HAD NOT MASTERED THEIR LANGUAGE.

MANY OF THESE MEN TURNED TO A LIFE OF CRIME.

ALMOST OVERNIGHT THERE WERE REPORTS UP AND DOWN THE MOTHERLODE OF RUTHLESS DESPARADOS PERPETRATING MUDEROUS ATTACKS ON WHITES AND CHINESE AFTER A WHILE SOMEONE IN THE MEDIA DETERMINED THAT THESE HEINOUS ACTS MUST BE THE WORK OF A BAND OF CUT THROATS BUT WHO WAS THEIR LEADER?

JUST BEFORE BEING HUNG FOR BANDITRY A MAN NAMED TEODOR VASQEZ IMPLICATED ONE JOAQUIN MURRIETA  SOMEONE HE HAD NEVER MET  . AS HE STOOD ON THE GALLOWS PLAYING FOR TIME HE MANAGED TO COME UP WITH THE NAMES OF MANY OTHERS BUT THIS ONE NAME MANAGED TO STICK IN PEOPLES MINDS MOSTLY BECAUSE HE WAS SAID TO HAVE A SCAR ON HIS FACE.

THE NEWSPAPERS HAVING LITTLE ELSE TO GO BY SEIZED ON THIS AND IT TOOK OFF FROM THERE... ENTER HARRY LOVE. HARRY WAS AN OPPORTUNIST OF THE FIRST ORDER WHO MANAGED TO CONVINCE THE STATE LEGISLATURE TO BANKROLL AN OUTFIT LED BY HIM THAT WOULD COME TO BE KNOWN AS THE CALIFORNIA RANGERS

WE HAVE VERY LITTLE INFORMATION ON MR. LOVE''S PAST EXCEPT WHAT HE HIMSELF REVEALED IN HIS OWN AUTOBIOGRAPHY THIS WAS QUITE A PIECE OF WORK IN WHICH HE CLAIMED TO BE A WAR HERO AND A TEXAS RANGER.

THE GOVERNOR OF CALIFORNIA AT THE TIME JOHN BIGLER WAS EAGER TO SEE THE NEWSPAPERS PRINT SOMETHING FAVORABLE ABOUT HIS REGIME AND THE CALIFORNIA RANGERS SEEMED LIKE JUST THE TICKET.

HARRY LOVE WAS GIVEN FREE REIN TO HAND PICK HIS OWN MEN AND QUICKLY SURROUNDED HIMSELF WITH RUTHLESS TYPES LIKE THE MAN WHO SHOT JIM SAVAGE WALTER HARVEY. FOR THE NEXT COUPLE OF YEARS THE RANGERS RODE UP AND DOWN THE STATE IN PURSUIT OF THE NOTORIOUS BANDIT JOAQUIN ALTHOUGH THE RANGERS CLAIMED TO BE RIGHT ON THE HEELS OF THEIR CELEBRATED QUARRY WHENEVER THEY NEEDED FUNDING FROM THE STATE LEGISLATURE. HARRY KNEW THAT HIS FORTUNE LIE IN KEEPING THE LEGEND OF JOAQUIN ALIVE FOR AS LONG AS HE COULD.

EVENTUALLY ANY VIOLENT CRIME COMMITTED BY AN HISPANIC WAS CREDITED TO JOAQUIN OR ONE OF HIS BAND NEWSPAPER ACCOUNTS FROM SAN DIEGO TO YREKA WOULD CREDIT THE BANDIT WITH BEING ABLE TO BE IN TWO PLACES AT ONE TIME. ONE WOULD THINK THAT THIS WOULD TEND TO MAKE PEOPLE SCRATCH THEIR HEADS AND SAY "NO WAY."

BUT IT HAD JUST THE OPPOSITE EFFECT IT TENDED TO LEND A SUPERNATURAL AIR TO THE BANDIT AND HIS MEN.

EVENTUALLY THE STATE GREW WEARY OF DOLING OUT ALL THIS MONEY TO HARRY AND HIS MEN AND DEMANDED RESULTS

WELL RESULTS THEY WANTED AND RESULTS THEY GOT. THE CALIFORNIA RANGERS FINALLY GOT THEIR MAN OR AT LEAST SOMEONE WHO RESEMBLED HIM. THEY LOPPED OFF THE FELLOWS HEAD AND PRESENTED THEIR GRISLY TROPHY ALONG WITH THE HAND OF THREE FINGERED JACK ONE OF HIS KNOWN ACCOMPLICES. WITH NO REASON TO JUSTIFY THE FURTHER EXISTENCE OF THE RANGERS THEY WERE DISBANDED.

STRANGELY ENOUGH THE CRIME RATE AMONG MEXICANS WAS UNAFFECTED BUT NO ONE SEEMED TO NOTICE BECAUSE JOAQUIN WAS DEAD!

EVER THE OPPORTUNIST HARRY LOVE TOOK HIS SHOW ON THE ROAD HE WOULD HAVE MADE P.T. BARNUM PROUD TRAVELING UP AND DOWN THE STATE SHOWING OFF THE HEAD AND HAND CAREFULLY PRESERVED IN A JAR OF ALCOHOL YES THE ENTERTAINMENT STARVED PEOPLE OF CALIFORNIA PAID GOOD MONEY TO SEE WHAT ALL THE FUSS WAS ABOUT AND HARRY AND HIS ENTOURAGE CONTINUED TO LINE THEIR POCKETS HAWKING THE LEGEND OF JOAQUIN. AFTER A WHILE JUST ABOUT EVERYONE HAD SEEN THE HEAD AND HARRY HAD TO COME UP WITH ANOTHER WAY TO MAKE SOME BEER MONEY SO HE  APPEALED TO AND GOT FROM THE STATE LEGISLATURE MONEY TO COVER ALL OF HIS "EXPENSES" THAT HE HAD INCURRED AS THE STATES TIRELESS SERVANT.

SADLY THE HEAD OF JOAQUIN WAS LOST IN THE GREAT SAN FRANCISCO EARTHQUAKE AND FIRE.



# JAMES MARSHALL CHAPTER FORTY NINE

JAMES WILSON MARSHALL WAS A DESCENDANT OF JOHN HART A SIGNER OF THE DECLARATION OF INDEPENDENCE.  HE WAS ALSO RELATED TO JOHN MARSHALL THE SUPREME COURT JUSTICE.  HE HAILED FROM A TOWN CALLED LAMBERTVILLE N.J. WHERE HE IS STILL CONSIDERED THEIR FAVORITE SON. YOUNG WILSON WAS A WHEELWRIGHT.  BACK IN THOSE DAYS A GOOD CARPENTER DREAMED OF SOMEDAY BEING GOOD ENOUGH TO BE ABLE TO MAKE WHEELS. AFTER A GREAT DEAL OF RAMBLING WHICH INCLUDED MISSOURI, OREGON HE EVENTUALLY CAME TO SUTTER''S FORT WHERE HE COULD MAKE OR FIX ANYTHING FROM SPINNING WHEELS TO FURNITURE.

AFTER TAKING A ROLE IN THE BEAR FLAG REBELLION MR. MARSHALL RETURNED TO THE RANCH HE HAD ESTABLISHED WITH THE WAGES HE HAD MADE WORKING FOR CAPTAIN SUTTER ONLY TO FIND IT HAD BEEN PILLAGED IN HIS ABSENCE.  HE HAD NO CHOICE BUT TO GO BACK TO WORK FOR THE GOOD CAPTAIN.

AT A PLACE NOT FAR FROM HERE CALLED COLOMA MR. MARSHALL''S JOB WAS TO CONSTRUCT A SAWMILL TO FURNISH BUILDING MATERIALS FOR SUTTERS GROWING EMPIRE. THE SAWMILL WAS TO BE RUN BY HARNESSING THE POWER OF THE AMERICAN RIVER USING A WATER DRIVEN WHEEL. AFTER A RATHER DISMAL TRIAL RUN IT WAS DETERMINED THAT MORE WATER WAS GOING TO HAVE TO COME THROUGH THE TAILRACE TO GET THE WHEEL TO TURN FAST ENOUGH TO BE ABLE  TO MILL ANY LUMBER. THE SOLUTION WAS TO DIG IN THE DAYTIME AND LET THE WATER RUN THROUGH AT NIGHT.  NOW JAMES HAD A LITTLE KNOWLEDGE OF GEOLOGY AND HAD REMARKED IN HIS WRITINGS OF "BLOSSOM" (QUARTZ OUTCROPPINGS) IN THE AREA WELL BEFORE THE ACTUAL GOLD DISCOVERY DATE.  WHEN THE WATER SCOURED OUT THE TAILRACE, NATURALLY THE GOLD WOULD GET CAUGHT IN THE FISSURES IN THE BEDROCK.  THAT MONDAY MARSHALL ORDERED THE HEAD GATE AT THE UPPER END OF THE DITCH SEALED OFF WITH LEAVES, DIRT AND SAW DUST, THUS ALLOWING NO WATER TO COME THROUGH.  WALKING THROUGH THE DITCH HE SPOTTED SOME "COLOR".  NOT WANTING TO BE EMBARRASSED, HE TESTED WHAT HE FOUND BY HITTING IT WITH A ROCK.  IT DID NOT SHATTER, AS FOOLS GOLD WOULD, AND THIS CONFIRMED HIS SUSPICIONS. HE WRAPPED HIS FINDINGS IN A HANDKERCHIEF AND TOOK THEM TO CAPTAIN SUTTER.

THIS WOULD HAVE BEEN GOOD NEWS EXCEPT THAT JOHN SUTTER HAD NO CLAIM TO THE LAND THAT THE SAW MILL WAS SITTING ON.  THE FACT IS, THE DISCOVERY OF GOLD PROVED TO BE A DISASTER FOR JOHANN AUGUSTUS SUTTER.  BECAUSE ALL OF HIS WORKERS AT THE FORT LEFT THEIR JOBS FOR THE GOLD FIELDS.  EVEN MARSHALL HIMSELF CAUGHT GOLD FEVER AND GAVE UP ON THE MILL AFTER ONLY TWO YEARS OF OPERATION.

JAMES HAD NUMEROUS OTHER BUSINESS  VENTURES RANGING FROM FARMING AN APPLE ORCHARD TO WINE MAKING TO SELLING HIS AUTOGRAPH FOR .25 A COPY.  ON AUGUST 10, 1885 JAMES WILSON MARSHALL DIED.  A MONUMENT WAS BUILT OVER HIS GRAVE IN COLOMA THAT PORTRAYS MARSHALL WITH A GOLD NUGGET IN ONE HAND AND POINTING TO THE GOLD DISCOVERY SITE WITH THE OTHER.



# TRINITARIANUS CHAPTER SIXTY TWO

THE CHAPTER FROM TRINITY COUNTY IS SOMETIMES PRONOUNCED

TRIH-NIH-TEAR-REE-AAH-NUHS BUT XNGH "REDEYE" WHO WAS TAKEN IN BY CHAPTER SIXTY TWO BACK BEFORE I WAS EVEN ELIGIBLE FOR MEMBERSHIP SAYS, "AY-NUS".

REGARDLESS OF IT''S PRONUNCIATION NO ONE FROM THERE I''VE TALKED TO KNOWS WHAT THE FUCK IT MEANS



# HUMBUG CHAPTER SEVENTY THREE

THE AMERICAN HERITAGE DICTIONARY DEFINES HUMBUG ALTERNATIVELY AS A HOAX OR A PERSON WHO DELIBERATLY SETS OUT TO DECIEVE OTHERS, A CHARLATAN.  I AM SURE EVERYONE HERE IS WELL AWARE OF A THIRD DEFINITION OF THE WORD HUMBUG, THAT  OF COURSE BEING AN X-HUMBUG IN IT''S LARVAL STAGE

THERE IS A CREEK IN SISKIYOU COUNTY CALLED THE HUMBUG, WHICH FLOWS THROUGH THEIR TERRITORY AND INTO THE MIGHTY KLAMATH. I CAN''T SAY FOR SURE BUT IT''S POSSIBLE THAT THEIR ONCE WAS A TOWN OF THE SAME NAME BUT IT''S NOT ON THE MAP NOW. IF ANYONE HAS ANYMORE INFORMATION ON THE HUMBUG CHAPTER I''D LOVE TO HEAR IT.



# GROWLERSBURG CHAPTER EIGHTY SIX

GROWLERSBURG WAS THE ORIGINAL NAME OF GEORGETOWN WHICH ALONG WITH UNCLE TOM''S CABIN MAKES UP THE GROWLERSBURG ENVIRONS



#AL PACKER  ONE HUNDRED

THIS IS AN OUTPOST OF THE MATT WARNER CHAPTER AND CLAIMS THE ENTIRE STATE OF COLORADO AS THEIR TERRITORY.

AFTER THE WORST SNOWSTORM IN MANY MANY YEARS AL PACKER AND SOME OTHERS FOUND THEMSELVES SNOWED IN FOR THE WINTER.THIS WAS  NOT FAR FROM WHAT WAS AT THAT TIME THE HIGHEST POINT IN THE UNITED STATES AT AROUND 14,000 FEET.  AFTER A FEW MONTHS, STARVATION DROVE THESE MEN TO DESPERATION AND THE LIVING BEGAN TO FEED OFF THE BODIES OF THE DEAD. ONCE A MAN HAS CROSSED THAT LINE AND HE BECOMES A CANNIBAL , MURDER BECOMES JUST ANOTHER CRIME. OBVIOUSLY

IT WAS JUST A MATTER OF TIME BEFORE THE SURVIVORS BEGAN TO CONTEMPLATE EACH OTHER. AL PACKER AND HIS PARTNER DID AWAY WITH THE OTHERS AND FED OFF THEIR BODIES

EVENTUALLY MR. PACKER KILLED HIS PARTNER BECAUSE HE WAS SURE THAT HE WAS PLOTTING HIS DEMISE. WHEN THE THAW FINALLY CAME, AL PACKER WAS BROUGHT TO JUSTICE

AL PACKER IS THE ONLY MAN IN THE HISTORY OF THE UNITED STATES TO BE TRIED AND HUNG FOR THE CRIME OF MURDER FOR THE PUPOSE OF CANNIBALISM



# EUREKA CHAPTER 101

EUREKA IS A GREEK WORD MEANING "I HAVE FOUND IT" WHICH IS THE CALIFORNIA STATE MOTTO. WHICH USUALLY IS IN REFERENCE TO GOLD

THIS PARTICULAR CHAPTER IS BASED IN EUREKA AND THEIR TERRITORY ENCOMPASSES HUMBOLDT COUNTY.  THEY''VE TAKEN THE NUMBER DESIGNATION 101 FROM THE HIWAY THAT PASSES THROUGH TOWN



WHAT SAY THE BRETHREN!

FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('b311cdec-9d1d-44cb-afca-e04d9d71b5d6',
        'The Gabrielino',
        '"KURTeous MAXIMVS" XNGH',
        '1999-10-15',
        ARRAY ['history', 'serious shit'],
        '# THE GABRIELINO


THE GABRIELINO WERE AN INDIAN TRIBE THAT WERE DESCENDED FROM  SHOSHONE PEOPLE who had migrated to AND OCCUPIED SOUTHERN CALIFORNIA, SPECIFICALLY RIVERSIDE, SAN BERNADINO, LOS ANGELES AND ORANGE COUNTIES INCLUDING THE ISLANDS OF SAN CLEMENTE AND CATALINA.

GABRIELINO COMMUNITIES  AT ONE TIME NUMBERED RIGHT AROUND ONE HUNDRED.

THE MODERN CITIES OF TEHUNGNA AND CUCAMONGA WERE ORIGINALLY  GABRIELINO VILLAGES

LOS ANGELES ITSELF WAS ORIGINALLY CALLED YANGNA.

THEY WERE AN  ECONOMICALLY ADVANCED SOCIETY THAT HAD DEVELOPED THEIR OWN MONETARY SYSTEM UTILIZING STRINGS OF SHELL BEADS FOR CURRENCY. THEY MINED SOAP STONE FROM CATALINA WHICH THEY CARVED INTO USEFUL ARTICLES  AND TRADED WITH NEIGHBORING TRIBES AS FAR EAST AS NEW MEXICO.

THEIR GOVERNMENT WAS  TYPICAL OF INDIGENOUS AMERICAN PEOPLE WITH A CHIEF AND HIS IMMEDIATE FAMILY AS A RULING CLASS. THE RELIGIOUS LEADERS WERE SHAMAN WHO WERE PART OF A JIMSONWEED CULT AND WORSHIPED THE GOD CHIN-GICH-N-GISH.

THE GABRIELINO WERE A PEACEFUL PEOPLE WHO LIVED IN LODGES BUILT FROM WOODEN POLES AND  MATS WOVEN FROM TULE GRASS.

THEY WERE  MONOTHEISTIC, MONOGAMOUS, BATHED EVERY DAY AS PART OF STRICT REGIMEN AND NEVER WORE CLOTHES.

YES THEIRS WAS A NEAR PERFECT EXISTENCE THAT WAS TOO GOOD TO LAST

ALONG CAME A MAN NAMED GASPAR DE PORTOLA AND THE SPANISH MISSIONARIES

WHEN THE SPANISH BEGAN TO POPULATE SOUTHERN CALIFORNIA   THEY BROUGHT THE GABRIELINOS EVERY THING THEY DIDN''T NEED, A NEW RELIGION, STEEL TOOLS, CLOTHES,

BAD PERSONAL HYGIENE, AND SYPHILIS. AS WITH MOST AMERICAN INDIAN TRIBES THE GABRIELINO HAD NO NATURAL RESISTANCE TO MOST OF THE EUROPEAN DISEASES

INCLUDING INFLUENZA, TUBERCULOSIS AND ALCOHOLISM.

AS A RESULT THEY BEGAN THEIR SLOW DECLINE INTO EXTINCTION

THE NAME GABRIELINO MEANS "PEOPLE OF THE SAN GABRIEL MISSION."

THIS WAS A SPANISH WAY TO CATEGORIZE AN ENTIRE NATION OF SMALL TRIBES.

WHEN MEXICO LOST THE WAR AND THEIR LAND BECAME PART OF THE STATE OF CALIFORNIA THE PEOPLE NOW KNOWN AS THE GABRIELINO WHO ONCE NUMBERED IN THE HUNDREDS OF THOUSANDS HAD THEIR POPULATION REDUCED TO ONLY ABOUT EIGHTEEN HUNDRED. THEIR PLIGHT UNDER THE U.S. GOVERNMENT WAS NO BETTER THAN IT WAS UNDER THE SPANISH AND MEXICANS AND BY THE TURN OF THE CENTURY ONLY A HANDFUL HAD SURVIVED.

BY THE NINETEEN FIFTIES NOT ONE FULL BLOODED GABRIELINO REMAINED.



WHAT SAY THE BRETHREN!

FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('aea103f5-c9ca-41ba-97d5-798e84744bad',
        'The Impact',
        '"KURTeous MAXIMVS" VNGH',
        '1997-11-21',
        ARRAY ['history', 'serious shit'],
        'THIS MONTH''S REPORT IS DEDICATED TO THE MEMORIES OF BROTHERS LOST;

FRANKIE "REJECTO" CONTREREZ, SCOTT "ANIMAL" RAWLINSON,

ROBERT "NICK" NICOLETTI... GONE TO THE GOLDEN HILLS

AND "SCOTMAN" WHOSE LUCK FINALLY RAN OUT WHEN A JUDGE SAID, "STRIKE THREE"



I WOULD LIKE TO THANK "SOURDOUGH SCOTT" FOR GIVING ME THIS BOOK AS IT PROVED INVALUABLE IN THE WRITING OF THIS REPORT THAT I CALL...

# THE IMPACT


SOME MIGHT THINK THAT THE  RUSH OF ''49 WAS AN INCIDENT THAT HAD LITTLE EFFECT ON THE REST OF THE COUNTRY LET ALONE THE WORLD . NOTHING COULD BE FURTHER FROM THE TRUTH

THE LURE OF CALIFORNIA''S GOLD BROUGHT THOUSANDS OF "RUSHERS" FROM ALL POINTS OF THE GLOBE. THESE PEOPLE WERE THE CREAM OF CIVILIZATION, POOR BUT INDUSTRIOUS. DOWN ON THEIR LUCK, BUT NOT IN SPIRIT. WHY ELSE WOULD A PERSON BRAVE THE UNCERTAINTIES OF NINETEENTH CENTURY TRAVEL;  IT WAS BETTER TO DIE FREE THAN TO ROT IN DEBTORS PRISON. IT WAS BETTER TO GAMBLE IT ALL ON AN UNCERTAIN FUTURE THAN TO REMAIN AT HOME AND FACE CERTAIN STARVATION.

THE MERE CHANCE OF BEING ABLE TO RISE ABOVE ONES LOW STATION IN LIFE WAS WORTH ANY RISK.  THE CAUSES WERE MANY BUT THE REASONS WERE ALL THE SAME;

THE POTATO FAMINE IN IRELAND KILLED UNTOLD THOUSANDS DURING WHAT WAS KNOWN AS THE "THE BLACK FORTIES"

IN FRANCE  NAPOLEON''S ILL-FATED ATTEMPTS TO BECOME EMPEROR OF EUROPE HAD BANKRUPTED A POPULACE FORCED TO PAY "REPARATIONS" TO THE BANK OF ENGLAND

OUR OWN COUNTRY WAS IN THE MIDST OF A SEVERE ECONOMIC DEPRESSION. THIS DEPRESSION WAS PERPETRATED BY WHAT WE NOW CALL THE FEDERAL RESERVE. IN THE 1830''S IT  WAS  KNOWN AS THE NATIONAL BANK. BY TIGHTENING UP THE MONEY MARKET THEY WERE ABLE TO HOLD THE NATIONS ECONOMY HOSTAGE IN RETALIATION FOR PRESIDENT ANDREW JACKSON''S REVOKING THEIR CHARTER AS THE NATIONAL TREASURY ON JULY 10, 1832.

SETTLERS HAD ALREADY BEEN ARRIVING FROM THE "STATES", EAGER TO TILL THE  TAX FREE SOIL TO BE FOUND IN OREGON AND THE NORTHERNMOST REGION OF MEXICO KNOWN AS ALTA (OR UPPER) CALIFORNIA.

WHEN "THE SHOUT WENT UP",   THIS TRICKLE BECAME A FLOOD. THEIR NUMBERS BOLSTERED BY THE OPPORTUNISTS SEEKING TO GET RICH QUICK, THE POPULATION OF CALIFORNIA WAS QUICKLY AMERICANIZED.

THE  MENTION OF THE WORD "FORTY-NINERS" TODAY BRINGS TO MIND A  FOOTBALL TEAM... IN THE ENSUING MELEE THAT WAS THE GOLD RUSH, TO BE LABELED A

" FORTY NINER" WAS AN INSULT. IT MEANT AN OPPORTUNIST OF THE WORST SORT USUALLY  A FUGITIVE FROM JUSTICE OR A DESERTER FROM THE ARMY. YEARS LATER  IT WOULD BECOME A BADGE OF HONOR, THE DESIGNATION OF A MAN OF EXPERIENCE, OF WISDOM ACQUIRED THROUGH HARDSHIP,  HARD WORK AND BETTER THAN AVERAGE LUCK. MORE IMPORTANTLY THE WORD FORTYNINER CAME TO BE SYNONYMOUS WITH SURVIVOR. MOST OF THE ORIGINAL FORTY NINERS HAD EITHER WENT HOME PENNILESS OR DIED FROM CHOLERA, PNEUMONIA, TYPHUS OR MALNUTRITION THE LIFE EXPECTANCY OF A "RUSHER" WAS QUITE SHORT INDEED. BAD FOOD BAD WEATHER BAD LUCK AND BAD PRICES FOR EVERYTHING. EVEN IF YOU DID STRIKE IT RICH YOU BECAME THE TARGET OF CLAIM JUMPERS AND BANDITS.

FROM THE YEAR 1848 TO 1900 THE BILLIONS IN GOLD THAT WAS MINED FROM THE MOTHERLODE ROCKETED THE UNITED STATES TO THE STATUS OF WORLD POWER. WE WERE BEHOLDEN TO NONE. WITHOUT THIS STATE''S  MINERAL WEALTH THIS COUNTRY WOULDN''T BE IN ANY BETTER SHAPE THAN MEXICO IS IN TODAY.

BEFORE THE RUSH THIS COUNTRY WAS A MONETARY FLEDGLING, STRUGGLING  WITH THE INTERNATIONAL BANKING EMPIRES. AFTER THE RUSH THE PRICE OF PRECIOUS METALS ON THE WORLD MARKET WAS SET BY US AND THAT WAS SPELLED U. S.

ONCE THE RUSH HAD PLAYED OUT THE STATE OF CALIFORNIA TURNED TO AGRICULTURE

THE VAST FLOOD PLAIN THAT WAS THE SACRAMENTO AND SAN JOAQUIN VALLEYS BECAME WHAT THEY ARE TODAY...                                                                                                                                                                                                                   THE MOST PRODUCTIVE FARMLAND IN THE HISTORY OF CIVILIZATION!

MAKE NO MISTAKE THE DAYS OF ''49 CHANGED THE COURSE OF HISTORY THE FACE OF THE WORLD AND THE STRENGTH OF A NATION!


WHAT SAY THE BRETHREN!

FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('75624914-2c65-4180-8e3a-3107817be019',
        'The Meaning',
        '"KURTeous MAXIMVS" XNGH',
        '2001-11-16',
        ARRAY ['history', 'serious shit'],
        '`BORN AGAIN BOB`

      THIS IS DEDICATED TO YOUR LASTING MEMORY

      <br />
      <br />



      THE MEANING OF THE WORDS E CLAMPUS VITUS IS SOMEWHAT OBSCURE

      THE FOLLOWING IS AN EXPLANATION ORIGINALLY PUBLISHED IN “E CLAMPUS VITUS THEN AND NOW”

      BY THE WAY I SHORTENED THIS UP JUST BIT SO THAT THE OLDER  AND LESS SOBER  MEMBERS DON’T LAPSE INTO UNCONSCIOUSNESS AND BEGIN TO SNORE …OKAY LEAK?



      THE MEANING


      IT IS AGREED BY SOME THEOLOGIANS THAT THE LETTER  “E” STANDS FOR ELOHIST PROPHETIC DOCUMENT

      ONE OF THE ANCIENT CHRONICLES FROM WHOSE WISDOM THE PAST NOBLE GRAND HUMBUG, MOSES DRANK COPIOUSLY JUST BEFORE HE DICTATED THE FIRST FIVE BOOKS OF THE OLD TESTAMENT.

      THUS STANDS CONFIRMED THE TRADITION THAT THE ORDER WAS FOUNDED IN THE BEGINNING OF TIME AND IS COEVAL WITH THE HUMAN RACE

      IN THE WORD “CLAMPUS” MAY BE  RECEOGNIZED THE WORD “KLEPT”  TO TAKE OR STEAL TO CARRY OFF

      THIS CLEARLY SIGNIFIES THAT ADAM STOLE OR SMUGGLED OUT OF THE GARDEN OF EDEN HIDDEN BENEATH HIS APRON THE SEEDS AND SYMBOLS OF THE ORDER.

      THE ONLY RELICS WHICH HAVE BEEN PRESERVED OF THE ORIGINAL HAPPY AND VIRTUOUS STATE OF MANKIND

      THE WORD “VITUS”, FROM THE GREEK “PHITOS” A FATHER REFERING TO ADAM THE ORIGINAL FATHER AND PROGENITOR OF US ALL

      SECONDLY CONCERNING THE NOBILITY, VERITABILITY, AND ESSENTIAL VIRILITY OF E CLAMPUS VITUS, SOME HISTORIANS SAY IT IS KNOWN THAT THE LETTER  “E “ DESCENDS FROM PHONECIAN CHARTER (HE) A WINDOW, SIGNIFYING THAT THROUGH THE ADMISSION TO THE ORDER, AS THROUGH A WINDOW, A LIGHT OF KNOWLEDGE COMES TO THE POOR BLIND CANDIDATE WHO HAVE LONG GROPED IN DARKNESS. THIS IS MORE EVIDENT FROM THE FACT THAT “E” IS NOT ONLY A LETTER BUT IT IS ALSO A WORD,

      IN LATIN MEANING “OUT OF.”  CLAMPUS ON THE OTHER HAND IS CLEALY REMENISCENT OF THE LATIN WORD CLAM WHICH SIGNIFIES UNKNOWN TO, WITHOUT KNOWLEDGE OF, IN OTHER WORDS IN IGNORANCE OR DARKNESS. THUS IT IS POSSIBLE THAT E CLAM PLAINLY MEANS OUT OF DARKNESS

      THE TERM “PUS” IS TAKEN FROM THE LATIN POS MEANING AFTER AND VITUS FROM  “VITA” LIFE WHICH COMPLETES THE MEANING OUT OF DARKNESS AFTER SEEKING LIFE SIGNIFYING THAT ALL GOOD CLAMPERS SEEK LIFE AMONG THE BRIGHT LIGHTS

      THE TRUE TITLE OF THIS CONFRATERNITY THUS IS, AS ORIGINALLY POSTULATED, E C V

      AND IT EMBODIES IN SYMBOLIC FORM THE IMMEMORIAL ANTIQUITY, THE EXALTED NOBILITY

      AND THE COGENT REGENERATIVE PROLIFIC POTENCY WHICH HAVE CHARACTERIZED THE ORDER FROM IT’S FIRST BEGINNING AND WILL EVER ASSURE ITS PREEMINENCE.

      SO AS YOU CAN PLAINLY SEE

      THE MEANING OF THIS TITLE STILL REMAINS A MYSTERY TO HISTORIANS




      WHAT SAY THE BRETHREN!

      FYIK');

INSERT INTO history_reports (id, title, author, date, tags, body)
VALUES ('51655961-6fe3-42e7-994e-f9349e5b1d36',
        'The Stars and Stripes',
        '"KURTeous MAXIMVS" XNGH',
        '1999-11-19',
        ARRAY ['history', 'serious shit'],
        'WHEN THE UNITED STATES WAS STILL CALLED THE AMERICAN COLONIES THERE WAS A LOT OF PEOPLE WHO CALLED FOR INDEPENDENCE FROM GREAT BRITAIN. AT THE SAME TIME HOWEVER THERE WERE A GREAT NUMBER OF PEOPLE WHO WERE STILL LOYAL TO THE CROWN THESE PEOPLE WERE CALLED APPROPRIATELY ENOUGH, LOYALISTS.

THERE WAS A THIRD GROUP OF CITIZENS WHO WERE JUST TRYING TO KEEP IT ALL TOGETHER THROUGH COMPROMISE

IT IS BECAUSE OF THIS THIRD GROUP OF COLONIALS THAT THE FIRST "AMERICAN" FLAG WAS CREATED.

UP UNTIL THAT TIME EACH COLONY HAD IT''S OWN MILITIA THAT FOUGHT UNDER THE BRITISH "UNION JACK". THE CONTINENTAL FLAG WAS DESIGNED TO MAKE EVERYONE HAPPY IT FEATURED THE UNION JACK IN THE UPPER LEFT HAND CORNER OF A FIELD OF RED AND WHITE STRIPES

THIS WAS SIMILAR TO A BRITISH NAVAL ENSIGN WHICH HAD THE UNION JACK IMPOSED ON A WHITE FIELD.

THE REASON FOR SUCH A CONFIGURATION WAS A VERY PRACTICAL ONE.

WHEN TRYING TO CONVEY A DISTRESS SIGNAL AT SEA IT''S CUSTOMARY TO INVERT THE SHIP''S FLAG.

BY FLYING YOUR COLORS UPSIDE DOWN YOU CAN SUMMON OTHER SHIPS TO YOUR AID.

THE UNION JACK ITSELF APPEARS THE SAME WHEN INVERTED, FOR THAT REASON IT MAKES A LOUSY NAVAL ENSIGN.

THE REASON FOR THE PLACEMENT IN THE UPPER LEFT CORNER IS EVEN MORE PRACTICAL WHEN HIGH WINDS TATTER THE FLAG THE IMPORTANT PART WILL STILL BE INTACT.



WHEN THE HOSTILITIES ENSUED BETWEEN THE BRITISH REDCOATS AND THE CONTINENTAL ARMY IT WAS NECESSARY TO CHANGE THE UNION JACK IN THE UPPER LEFT HAND CORNER TO SOMETHING ELSE.

THE BLUE BACKGROUND WAS KEPT BUT THE VARIOUS CROSSES OF THE UNITED KINGDOM WERE REPLACED BY THIRTEEN STARS ARRANGED IN AN ARC OVER THE NUMBER "76". IT WAS TO BE A CONSTELLATION OF STARS ARRANGED AROUND THE YEAR WHICH UNIFIED THEM

THIS HAS COME TO BE KNOWN AS THE BENINGTON FLAG.

(CONTRARY TO THE POPULAR MYTH BETSY ROSS DID NOT DESIGN THIS OR ANY OTHER FLAG.)

THIS WAS THE FIRST VERSION OF WHAT CAME TO BE KNOWN AS "THE STARS AND STRIPES." ALTHOUGH SOME MILITIAS WERE STILL USING THE PREVIOUS CONTINENTAL FLAG AND OTHERS WERE USING VARIATIONS OF THE "DONT TREAD ON ME" SERPENT,

IN TIME ALL WOULD FIGHT UNDER THE VENERABLE STARS AND STRIPES.

THE FOUNDING FATHERS ALSO GAVE US A CODE OF ETIQUETTE

THE REASON THAT IT IS FOLDED INTO A COMPACT TRIANGLE WITH NO RED OR WHITE VISIBLE WAS TO ENABLE THE BEARER TO MAKE IT APPEAR TO THE BRITISH SOLDIERS AS THOUGH SAID BEARER WAS ACTUALLY CARRYING A TRICORNERED HAT WHICH WERE QUITE POPULAR AT THE TIME.

IF YOU WERE CAUGHT WITH THE STARS AND STRIPES IN YOUR POSSESSION YOU WOULD BE HANGED FOR TREASON .

THE REASON THAT WE STILL OBSERVE THIS TRADITION IS VERY LOGICAL AS WELL.

IT MUST BE EASILY IDENTIFIED WHEN IT IS FOUND IN IT''S STORED CONDITION THEREFORE IT MUST ALWAYS BE FOLDED IN ACCORDANCE

WITH TRADITION.

WHENEVER A FLAG IS FOUND TO BE UNSERVICEABLE IT SHOULD BE TURNED OVER TO THE AMERICAN LEGION FOR CEREMONIAL DESTRUCTION. IT SHOULD NEVER BE USED FOR ANY OTHER THAN IT''S INTENDED PURPOSE

NEVER FLY THE STARS AND STRIPES AND THE FLAG OF ANOTHER COUNTRY ON THE SAME POLE THIS SYMBOLIZES A MILITARY VICTORY AND IS A GRAVE INSULT TO THE UNDERLYING FLAG.

A PROPER DISPLAY OF THIS TYPE WOULD PROVIDE FLAGS OF EQUAL SIZE ON STAFFS OF EQUAL HEIGHT

WHEN CALIFORNIA BECAME THE THIRTY SEVENTH STATE IT CREATED A PROBLEM. YOU SEE UP UNTIL THEN PRIME NUMBERS HAD BEEN AVOIDED THE NUMBER THIRTY SEVEN IS ONLY DIVISIBLE BY ITSELF AND THE NUMBER ONE. THIS MADE FOR AN UNLIKELY PATTERN OF STARS, BUT BECAUSE OF CALIFORNIA''S IMPORTANCE IT WAS IMPERATIVE THAT IT BE ADDED TO THE FLAG AS SOON AS POSSIBLE.

THUS THE CALIFORNIA ADMISSION FLAG HAS THE ODDEST PATTERN OF STARS OF ANY OF THE VERSIONS

THE NATIONAL ANTHEMS OF OTHER COUNTRIES TYPICALLY EXTOL THE VIRTUES OF A GREAT LAND, A GREAT MONARCH OR A GREAT REVOLUTION.

OUR NATIONAL ANTHEM IS ABOUT THAT WHICH CAN NEVER BE POLLUTED, CORRUPTED OR DENIGRATED

OUR NATIONAL ANTHEM IS NOT ABOUT WAR

OUR NATIONAL ANTHEM IS ABOUT A RECTANGULAR PIECE OF FABRIC THAT WEARS LIKE IRON

OUR NATIONAL ANTHEM IS CALLED THE STAR SPANGLED BANNER AND ITS ABOUT

A FLAG CALLED THE STARS AND STRIPES



<FYIK/>




## Sharpstone





I WOULD LIKE TO SAY A FEW WORDS ABOUT BROTHER SHARPSTONE

I DIDN''T SAY ANY THING AT HIS MEMORIAL SERVICE AND

I''VE BEEN KICKING MYSELF IN THE ASS EVER SINCE



NOT TOO MANY BROTHERS COULD HOLD A CANDLE TO THIS GUY

HE DIDN''T REALLY FIT THE CLAMPER STEREOTYPE

HE WASN''T LOUD OR BRASH

HE WAS ALWAYS READY TO HELP OUT AND NEVER WANTED ANYTHING IN RETURN



IN THE ENTIRE TIME I KNEW HIM I DON''T THINK I EVER HEARD HIM COMPLAIN ABOUT ANYTHING

HE WAS ONE OF THOSE RARE BROTHERS WHO ALWAYS CHOSE HIS WORDS

AND ALWAYS HELD HIS LIQUOR WELL

TO PUT IT SIMPLY HE DIDN''T REALLY STAND OUT IN THE CROWD

TOMMY STOOD OUT IN A WHOLE DIFFERENT WAY



TOMMY WAS A REDSHIRT''S REDSHIRT

IF I EVER NEEDED OUT OF A TIGHT SPOT

HE WAS DEFINITELY ON THE SHORT LIST OF BROTHERS THAT I WOULD BE ABLE TO CALL



WHEN I LAST TALKED TO HIM TOMMY KNEW THAT HIS NUMBER WAS UP

I DON''T KNOW IF I COULD HANDLE THAT KIND OF KNOWLEDGE



THE WORLD IS A LITTLE COLDER NOW THAT HE''S GONE

AND I SINCERELY BELIEVE THAT HE WILL BE MISSED BY EVERYONE

EVEN THOSE WHO DIDN''T KNOW HIM

WHAT SAY THE BRETHREN!

FYIK');

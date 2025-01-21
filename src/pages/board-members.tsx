import Image from 'next/image';
import PageSection from '@/components/page-section';

export default function BoardMembersPage() {
    return (
        <>
            <PageSection title="Board Members for Clamper Year 6029 (2024)">
                <div className="flex gap-4 items-center justify-center flex-wrap">
                    <Image src="./images/board/cakewalk.jpg" width={333} height={333} alt="Humbug - Cakewalk" />
                    <Image src="./images/board/spitshine.jpg" width={333} height={333} alt="Vice Humbug - Spitshine" />
                    <Image
                        src="./images/board/rock+bottom.jpg"
                        width={333}
                        height={333}
                        alt="Gold Dust Receiver - Rock Bottom"
                    />
                    <Image src="./images/board/Barf.jpg" width={333} height={333} alt="Recorder - Barf" />
                    <Image src="./images/board/tik+tok.jpg" width={333} height={333} alt="Hangman - Tik Tok" />
                    <Image
                        src="./images/board/historian.jpg"
                        width={333}
                        height={333}
                        alt="Historian - Kurteous Maximus"
                    />
                    <Image src="./images/board/2rooper.jpg" width={333} height={333} alt="Clampatriarch - 2rooper" />
                    <Image
                        src="./images/board/board+member+countdown.jpg"
                        width={333}
                        height={333}
                        alt="Board Member - Countdown"
                    />
                </div>
            </PageSection>
        </>
    );
}

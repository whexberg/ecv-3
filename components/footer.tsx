import { DateTime } from 'luxon';

const ORG_NAME = 'Lord Sholto Douglas Chapter E Clampus Vitus';

export const Footer = () => {
    const year = DateTime.local().year;

    if (year === 2025) {
        return (
            <footer className="py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2025 {ORG_NAME}. All rights reserved.</p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="py-4">
            <div className="container mx-auto px-4 text-center">
                <p>
                    © 2025 - {year} {ORG_NAME}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

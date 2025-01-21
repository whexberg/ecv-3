export const Footer = () => {
    const year = new Date().getFullYear();
    const orgName = 'Lord Sholto Douglas Chapter E Clampus Vitus';
    if (year === 2025) {
        return (
            <footer className="py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2025 {orgName}. All rights reserved.</p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="py-4">
            <div className="container mx-auto px-4 text-center">
                <p>
                    © 2025 - {new Date().getFullYear()} {orgName}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

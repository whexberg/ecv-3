export const Footer = () => {
    const year = new Date().getFullYear();
    if (year === 2025) {
        return (
            <footer className="py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2025 {process.env.REACT_PUBLIC_ORG_NAME}. All rights reserved.</p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="py-4">
            <div className="container mx-auto px-4 text-center">
                <p>
                    © 2025 - {new Date().getFullYear()} {process.env.REACT_PUBLIC_ORG_NAME}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

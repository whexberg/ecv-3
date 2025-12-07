import { notFound } from 'next/navigation';

export default function DevLayout({ children }: { children: React.ReactNode }) {
    // Only allow access in development
    if (process.env.NODE_ENV === 'production') {
        notFound();
    }

    return (
        <div className="dev-layout">
            <div className="mb-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
                <strong>Development Mode:</strong> This page is only available in development.
            </div>
            {children}
        </div>
    );
}

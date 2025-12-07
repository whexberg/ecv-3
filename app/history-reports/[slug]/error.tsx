'use client'; // Error components must be Client components

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex w-full items-center justify-center">
            <div>
                <h2 className="my-4 text-2xl font-bold">Something went wrong!</h2>
                <button
                    className="bg-accent mb-4 rounded-xl p-4 text-white"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button>
                <p className="text-xl">
                    Or go back to{' '}
                    <Link href="/" className="underline">
                        Home 🏠
                    </Link>
                </p>
            </div>
        </div>
    );
}

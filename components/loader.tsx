import { useEffect, useState } from 'react';

const messages = [
    'Dusting off the redshirt...',
    'Polishing the tin cup...',
    'Consulting the Oracle of Bodie...',
    'Wrestling raccoons off the campfire...',
    'Loading nonsense and tomfoolery...',
    'Searching for gold in the database...',
    'Untangling mustache hairs...',
    "Hollerin' at the moon...",
];

export function Loader() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const updateMessage = () => setMessageIndex((prev) => (prev + 1) % messages.length);
        const interval = setInterval(updateMessage, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6">
            <div className="border-sepia-500 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
            <p className="text-sepia-200 text-center text-sm italic">{messages[messageIndex]}</p>
        </div>
    );
}

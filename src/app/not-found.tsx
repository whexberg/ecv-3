import Link from 'next/link';

export default function Example() {
    return (
        <div className="mt-10 flex h-full flex-col items-center justify-center">
            <img alt="404" src="/images/404.png" className="border-accent max-w-sm border p-4" />

            <div className="flex flex-col items-center">
                <h1 className="text-accent mt-4 text-5xl font-semibold tracking-tight text-pretty sm:text-6xl">
                    Page not found
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty sm:text-xl/8">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10">
                    <Link href="/" className="text-accent text-sm/7 font-semibold">
                        <span aria-hidden="true">&larr;</span> Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}

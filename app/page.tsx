import NewsletterCard from "@/components/NewsletterCard";
export default function Home() {
    return (
        <>
            <div className="min-h-screen overflow-x-hidden">
                <div className="flex flex-col gap-8 text-center m-16 items-center">
                    <h1 className="max-w-2xl font-mono font-bold text-7xl drop-shadow-lg">
                        A unique way to listen to your favorite programs
                    </h1>

                </div>
                <div className="flex items-center justify-center pt-22 pb-24">
                    <img
                        className="lg:h-96 lg:w-96 md:h-72 md:w-72 sm:h-48 sm:w-48 rounded-lg shadow-xl shadow-blue-gray-900/50 m-8"
                        src="/modern.png"
                        alt="red"
                    />
                    <img
                        className="lg:h-72 lg:w-72 md:h-48 md:w-48 sm:h-32 sm:w-32 rounded-lg shadow-xl shadow-blue-gray-900/50 m-8"
                        src="/beep.png"
                        alt="red"
                    />
                    <img
                        className="lg:h-96 lg:w-96 md:h-72 md:w-72 sm:h-48 sm:w-48 sm:mx-6 rounded-lg shadow-xl shadow-blue-gray-900/50 m-8"
                        src="/red.png"
                        alt="red"
                    />
                    <img
                        className="lg:h-72 lg:w-72 md:h-48 md:w-48 sm:h-32 sm:w-32 rounded-lg shadow-xl shadow-blue-gray-900/50 m-8"
                        src="/pink.png"
                        alt="red"
                    />
                    <img
                        className="lg:h-96 lg:w-96 md:h-72 md:w-72 sm:h-48 sm:w-48 rounded-lg shadow-xl shadow-blue-gray-900/50 m-8"
                        src="/grey.png"
                        alt="red"
                    />
                </div>
                <div className="flex items-center justify-center py-56 bg-gray-50 dark:bg-gray-900">
                    <NewsletterCard/>
                </div>
            </div>
        </>
    );
}

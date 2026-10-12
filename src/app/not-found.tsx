import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">

        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-black text-red-600 tracking-tight">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl md:text-3xl font-bold">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 text-base md:text-lg">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে
          অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center mt-7 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200"
        >
          🏠 হোম পেজে ফিরে যান
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
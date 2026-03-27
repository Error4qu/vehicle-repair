import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1200px] w-full mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            Vehicle<span className="text-blue-600">Repair</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors no-underline">
            All Services
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors no-underline">
            How It Works
          </Link>
          <Link href="#guarantee" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors no-underline">
            Our Guarantee
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="#book" className="hidden sm:inline-flex text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors no-underline">
            Become a Mechanic
          </Link>
          <Link href="#book" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-all duration-200 no-underline shadow-sm hover:shadow-md">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}

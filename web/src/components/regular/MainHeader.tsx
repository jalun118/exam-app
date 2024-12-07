import TimerHeader from "./timer-header";
import TitleHeader from "./TitleHeader";
import UsernameHeader from "./username-header";

export default function MainHeader() {
  return (
    <header className="z-50 w-full border-b-gray-300 bg-white lg:border-b-2">
      <div className="md:container">
        <nav className="flex items-center px-5 py-2">
          <div className="inline-flex w-1/2 items-center justify-start">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="mr-1 size-8 rounded-full bg-blue-500 p-1.5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
              <span className="text-lg font-semibold italic text-blue-500">
                UjianApp
              </span>
            </div>
            {/* <img
            src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
            alt="xxxx"
            className="h-10 bg-cover bg-center md:h-full"
            /> */}
          </div>
          <TitleHeader />
          <div className="inline-flex w-1/2 items-center justify-end">
            <UsernameHeader />
            <TimerHeader />
          </div>
        </nav>
      </div>
    </header>
  );
}

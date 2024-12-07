"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function HomePage() {
  const router = useRouter();

  function handleForm(e: FormEvent) {
    e.preventDefault();
    router.replace("/join-test", { scroll: true });
  }

  return (
    <div className="mt-12 flex w-full justify-center">
      <div className="min-h-[28%] w-[90%] rounded-3xl border border-gray-500 bg-white p-8 md:w-[50%] lg:w-[40%] xl:w-[28%]">
        <form onSubmitCapture={(e) => handleForm(e)}>
          <h3 className="text-center text-2xl font-semibold">Login</h3>
          <div className="mb-3 mt-1">
            <label htmlFor="username" className="mb-1 block">
              Username
            </label>
            <input
              type="text"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-autocomplete="none"
              id="username"
              className="h-10 w-full border border-gray-500 p-3 outline-none ring-blue-300 focus:ring-2"
              placeholder="Username Anda"
            />
          </div>
          <div className="mb-3 mt-1">
            <label htmlFor="password" className="mb-1 block">
              Password
            </label>
            <input
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-autocomplete="none"
              type="text"
              id="password"
              className="h-10 w-full border border-gray-500 p-3 outline-none ring-blue-300 focus:ring-2"
              placeholder="Password Anda"
            />
          </div>
          <div className="mb-3 mt-1">
            <label htmlFor="kode-mapel" className="mb-1 block">
              Kode Mapel
            </label>
            <input
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-autocomplete="none"
              type="text"
              id="kode-mapel"
              className="h-10 w-full border border-gray-500 p-3 outline-none ring-blue-300 focus:ring-2"
              placeholder="Kode Mapel Ujian"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-2 rounded-lg border border-gray-500 bg-white px-5 py-1.5 text-lg text-black hover:bg-emerald-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

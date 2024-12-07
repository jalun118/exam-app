"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";

const SignInSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email"),
  password: yup.string().required("Required"),
});

export default function LoginPage() {
  const [isOpenPassword, SetIsOpenPassword] = useState(false);

  function handleForm(data: { email: string; password: string }) {
    console.log(data);
    window.location.replace("/dashboard");
  }

  return (
    <div className="min-h-screen w-full bg-neutral-100">
      <div className="relative min-h-screen bg-neutral-100">
        <main className="mx-auto my-0 flex min-h-screen max-w-[28rem] flex-col">
          <header className="my-10 flex items-center justify-center">
            <div className="mr-3 size-14 rounded-full bg-indigo-500 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
            <span className="text-3xl font-semibold italic text-indigo-500">
              UjianApp
            </span>
          </header>
          <div className="rounded-xl bg-white px-8 py-6 shadow-lg">
            <div>
              <Formik
                validationSchema={SignInSchema}
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(val) => {
                  console.log(val);
                  handleForm(val);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div>
                      <label htmlFor="email-label" className="mb-1 block">
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email-label"
                        name="email"
                        autoComplete="off"
                        autoCorrect="off"
                        aria-autocomplete="none"
                        className="block w-full rounded border-gray-400 px-3 py-2.5 focus:border-blue-600 focus:ring-blue-600 disabled:pointer-events-none disabled:opacity-50"
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <div>
                        <label htmlFor="password-label" className="mb-1 block">
                          Password
                        </label>
                        <div className="relative">
                          <Field
                            autoComplete="off"
                            autoCorrect="off"
                            aria-autocomplete="none"
                            type={isOpenPassword ? "text" : "password"}
                            id="password-label"
                            name="password"
                            className="block w-full rounded border-gray-400 px-4 py-3 pe-11 ps-3 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 end-0 z-20 flex items-center pe-3"
                            onClick={() => SetIsOpenPassword((prev) => !prev)}
                          >
                            {isOpenPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="size-6 text-gray-700"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="size-6 text-gray-700"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {errors.password && touched.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-x-5">
                      <div>
                        <Link href="/" className="text-gray-700 underline">
                          Forgot Password?
                        </Link>
                      </div>
                      <button
                        type="submit"
                        className="rounded-lg bg-black px-4 py-2.5 text-white"
                      >
                        Sign In
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";
import { examDataExample } from "@/dummy-data";
import { SetDataQuestion } from "@/lib/features/exam/questionSlice";
import { SetIdExam } from "@/lib/features/exam/userAnswersSlice";
import { SetUserLogin } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";

const dataObj = [
  {
    key: "Nama",
    value: "Jalu Nugroho",
  },
  {
    key: "Kelas",
    value: "10 E 1",
  },
  {
    key: "Mata Pelajaran",
    value: "Mtk Wajib",
  },
  {
    key: "Nama Ujian",
    value: "F O G O H",
  },
  {
    key: "Jumlah Soal",
    value: "10",
  },
  {
    key: "Durasi",
    value: "60 Menit",
  },
];

export default function JointTestPage() {
  const dispatch = useAppDispatch();
  const route = useRouter();

  useEffect(() => {
    console.log("socket login");
    // socket.emit("login", { username: "jalu nugroho", type: "login" });
  }, []);

  function handleJoint(e: FormEvent) {
    e.preventDefault();
    const examId = Buffer.from("mantapa jiwo mannnnnn wuhui").toString(
      "base64",
    );
    const room = Buffer.from(
      "mnagcasdasdjasdnkands adiaksdasmd asfdj kfad fnsd f df sdf fksdjfsnkd fk sdf ksd sfdm sdkfskfs",
    ).toString("base64");
    dispatch(SetUserLogin("jalu nugroho"));
    // document.documentElement.requestFullscreen().catch(e => {
    //   route.push("/");
    //   console.log(e);
    // });
    route.replace(
      "/join-test/question?exam=" +
        encodeURIComponent(examId) +
        "&room=" +
        encodeURIComponent(room),
      { scroll: true },
    );
    dispatch(SetDataQuestion(examDataExample));
    dispatch(SetIdExam(examDataExample.exam_id));
    // socket joint room
    // socket.emit("joint_room", { username: "jalu nugroho", room: "011-10" });
  }

  return (
    <div className="mb-28 mt-12 flex w-full justify-center">
      <div className="w-[93%] max-w-screen-md rounded-3xl border border-gray-500 bg-white px-5 py-6 md:w-fit md:px-8">
        <h3 className="text-xl font-semibold">Konfirmasi Formulir</h3>
        <div className="mb-5 mt-4 flex flex-col gap-x-10 gap-y-5 sm:flex-row">
          <div className="flex overflow-x-auto">
            <table className="border border-gray-500">
              <tbody className="divide-y divide-gray-500">
                {dataObj.map((v, i) => (
                  <tr className="divide-x" key={i}>
                    <td className="whitespace-nowrap px-6 py-3 text-lg text-gray-800 md:px-4 md:py-2.5">
                      {v.key}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-lg text-gray-800 md:px-4 md:py-2.5">
                      {v.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="block">
            <form onSubmit={(e) => handleJoint(e)}>
              <div>
                <label htmlFor="token-ujian" className="mb-2 block text-lg">
                  Token Ujian
                </label>
                <input
                  type="text"
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  aria-autocomplete="none"
                  id="password"
                  className="h-10 w-full border border-gray-500 p-3 outline-none ring-blue-300 focus:ring-2"
                  placeholder="XAE3D"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="mt-2 rounded-md border border-gray-500 px-4 py-1.5 text-black hover:bg-emerald-200"
                >
                  MULAI
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

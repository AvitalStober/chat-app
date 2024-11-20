// "use client";
// import Head from "next/head";
// import dynamic from "next/dynamic";

// const Chat = dynamic(() => import("../components/Chat"), {
//   ssr: false,
// });

// export default function Home() {
//   return (
//     <div className="container">
//       <Head>
//         <title>Realtime Chat App with Ably, NextJS and Vercel</title>
//         <link
//           rel="icon"
//           href="https://static.ably.dev/motif-red.svg?nextjs-vercel"
//           type="image/svg+xml"
//         />
//       </Head>
//       <main>
//         <h1 className="title">event name</h1>
//         <Chat />
//       </main>
//     </div>
//   );
// }

"use client";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import { BsChatDotsFill } from "react-icons/bs"; // אייקון לצ'אט
import { AiOutlineClose } from "react-icons/ai"; // אייקון לסגירה
import TailwindTry from "@/components/tailwindTry";
import Image from "next/image";

const Chat = dynamic(() => import("../components/Chat"), {
  ssr: false,
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false); // בקרה על הצ'אט

  return (
    <div className="relative">
      <Head>
        <title>Realtime Chat App with Ably, NextJS and Vercel</title>
        <link
          rel="icon"
          href="https://static.ably.dev/motif-red.svg?nextjs-vercel"
          type="image/svg+xml"
        />
      </Head>

      {/* כפתור צף */}
      <div className="fixed bottom-4 right-4">
        {!isOpen && (
          // <button
          //   onClick={() => setIsOpen(true)}
          //   className="p-4 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition"
          // >
            <Image
              src="/chat.png"
              alt="Shanay image"
              className="w-10 h-11"
              onClick={() => setIsOpen(true)}
              width={40}
              height={44}
            />
            /* <BsChatDotsFill size={24} /> */
          // </button>
        )}
        {isOpen && (
          <div className="w-80 h-auto bg-white shadow-lg rounded-lg fixed bottom-4 right-4 flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-2 rounded-t-lg">
              {/* <h2 className="font-bold">Chat</h2> */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                {/* <AiOutlineClose size={20} /> */}X
              </button>
            </div>

            {/* Content */}
            <main className="p-4">
              {/* <h1 className="text-lg font-bold mb-4 text-center">event name</h1> */}
              <Chat />
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

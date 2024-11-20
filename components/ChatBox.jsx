import React, { useEffect, useState } from "react";
import { useChannel } from "ably/react";
import styles from "./ChatBox.module.css";

export default function ChatBox() {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  let inputBox = null;
  let messageEnd = null;

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  const { channel, ably } = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <span key={index} className={styles.message} data-author={author}>
        {message.data}
      </span>
    );
  });

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <input
          ref={(element) => {
            inputBox = element;
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        //   className={styles.input}
          className="rounded-b-sm"
        ></input>
        <button
          type="submit"
          className={styles.button}
          disabled={messageTextIsEmpty}
          onClick={handleKeyPress}
        >
          Send
        </button>
      </form>
    </div>
  );
}










// import React, { useEffect, useState } from "react";
// import { useChannel } from "ably/react";
// import { BsChatDotsFill } from "react-icons/bs"; // אייקון לצ'אט
// import { AiOutlineClose } from "react-icons/ai"; // אייקון לסגירה

// export default function ChatBox() {
//   const [isOpen, setIsOpen] = useState(false); // שליטה על פתיחה/סגירה
//   const [messageText, setMessageText] = useState("");
//   const [receivedMessages, setMessages] = useState([]);
//   const messageTextIsEmpty = messageText.trim().length === 0;

//   let messageEnd = null;

//   useEffect(() => {
//     if (messageEnd) {
//       messageEnd.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [receivedMessages]);

//   const { channel, ably } = useChannel("chat-demo", (message) => {
//     const history = receivedMessages.slice(-199);
//     setMessages([...history, message]);
//   });

//   const sendChatMessage = (messageText) => {
//     channel.publish({ name: "chat-message", data: messageText });
//     setMessageText("");
//   };

//   const handleFormSubmission = (event) => {
//     event.preventDefault();
//     if (!messageTextIsEmpty) {
//       sendChatMessage(messageText);
//     }
//   };

//   const messages = receivedMessages.map((message, index) => {
//     const author = message.connectionId === ably.connection.id ? "me" : "other";
//     return (
//       <div
//         key={index}
//         className={`p-2 mb-2 max-w-[70%] rounded-lg ${
//           author === "me"
//             ? "bg-blue-500 text-white self-end"
//             : "bg-gray-200 text-gray-800 self-start"
//         }`}
//       >
//         {message.data}
//       </div>
//     );
//   });

//   return (
//     <div className="fixed bottom-4 right-4">
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="p-4 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition"
//         >
//           <BsChatDotsFill size={24} />
//         </button>
//       )}

//       {isOpen && (
//         <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col">
//           {/* Header */}
//           <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-2 rounded-t-lg">
//             <h2 className="font-bold">Chat</h2>
//             <button onClick={() => setIsOpen(false)} className="text-white">
//               <AiOutlineClose size={20} />
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto p-4 flex flex-col">
//             {messages}
//             <div
//               ref={(element) => {
//                 messageEnd = element;
//               }}
//             ></div>
//           </div>

//           {/* Input Box */}
//           <form
//             onSubmit={handleFormSubmission}
//             className="flex items-center border-t p-2"
//           >
//             <input
//               type="text"
//               value={messageText}
//               placeholder="Type a message..."
//               onChange={(e) => setMessageText(e.target.value)}
//               className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />
//             <button
//               type="submit"
//               disabled={messageTextIsEmpty}
//               className={`ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
//                 messageTextIsEmpty && "opacity-50 cursor-not-allowed"
//               }`}
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

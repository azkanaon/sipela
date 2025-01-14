import { useEffect, useRef, useState } from "react";
import { useDataChat } from "../store/DataChat";
import { BiMessageDetail } from "react-icons/bi";

import { MdOutlineMessage } from "react-icons/md";
import { formatTime, groupedMessagesByDay } from "../utils/formattedData";
import { cn } from "../utils/twMerge";

const LiveChat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [userSelected, setUserSelected] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const getChat = useDataChat((state) => state.getAllChats);
  const chats = useDataChat((state) => state.chats);
  const postChat = useDataChat((state) => state.postChat);
  const userWithLastChat = useDataChat((state) => state.userWithLastChat);
  const getUserWithLastChat = useDataChat((state) => state.getUserWithLastChat);

  const bottomRef = useRef(null);

  const handleSendMessage = (id) => {
    setIsUpdate(!isUpdate);
    if (inputMessage.trim()) {
      postChat(id, inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(userSelected);
    }
  };

  useEffect(() => {
    getChat(userSelected);
  }, [getChat, userSelected]);

  const groupingMessage = chats && groupedMessagesByDay(chats);

  useEffect(() => {
    getUserWithLastChat();
  }, [getUserWithLastChat, isUpdate, userSelected]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, userSelected]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
      {/* Left sidebar */}
      <div className="w-72 bg-white border-r">
        <div className="flex gap-2 p-4 border-b justify-center">
          <h2 className="text-aqua font-bold text-2xl">Chat</h2>
        </div>

        {/* User list */}
        <div className="overflow-y-auto h-[calc(100vh-9rem)]">
          {userWithLastChat.map((user) => (
            <div
              onClick={() => setUserSelected(user.id_user)}
              key={user.id}
              className={`relative flex items-center gap-3 p-4  cursor-pointer border-b
                ${
                  userSelected === user.id_user
                    ? "bg-teal-700 hover:bg-ocean text-overpost"
                    : "hover:bg-ocean/20"
                }
              `}
            >
              {user.user.pesan_count.length > 0 &&
                user?.user?.pesan_count[0]?.count !== 0 && (
                  <div className="absolute right-2 top-6 ">
                    <p className="bg-red-500 text-overpost w-5 h-5 rounded-full font-semibold text-xs flex justify-center items-center">
                      {user?.user?.pesan_count[0]?.count}
                    </p>
                  </div>
                )}

              <div className="w-10 h-10  rounded-full flex items-center justify-center bg-red-600">
                <img
                  src={user?.user?.foto_selfie}
                  className="h-full w-full rounded-full object-cover object-center"
                  alt=""
                />
              </div>
              <div>
                <div className="font-medium line-clamp-1 w-40">
                  {user.user.nama}
                </div>
                <div className="text-sm text-slate-400">
                  <p className="font-semibold line-clamp-1 w-40">
                    {user.message_content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-teal-700 text-white p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8  rounded-full flex items-center justify-center">
              <img
                src={
                  userWithLastChat.find((user) => user.id_user === userSelected)
                    ?.user.foto_selfie
                }
                className="h-full w-full rounded-full object-cover object-center"
                alt=""
              />
            </div>
            <span>
              {
                userWithLastChat.find((user) => user.id_user === userSelected)
                  ?.user.nama
              }
            </span>
          </div>
        </div>

        {/* Messages */}
        {userSelected ? (
          <div className="">
            <div className="flex-1 bg-blue-50 p-4 ">
              <div className="space-y-4 h-[calc(100vh-15.2rem)] overflow-y-auto">
                {chats.length > 0 ? (
                  Object.keys(groupingMessage).map((date) => (
                    <div key={date}>
                      <div className="flex justify-center">
                        <h2
                          className={cn(
                            "text-sm w-fit text-warm_grey font-semibold bg-slate-200 p-1 px-2 rounded-lg",
                            date == "Invalid Date" && "hidden"
                          )}
                        >
                          {date === "Invalid Date"
                            ? ""
                            : new Date(date).getDate() ===
                                new Date().getDate() &&
                              new Date(date).getMonth() ===
                                new Date().getMonth() &&
                              new Date(date).getFullYear() ===
                                new Date().getFullYear()
                            ? "Hari ini"
                            : date}
                        </h2>
                      </div>
                      {groupingMessage[date].map((message) => (
                        <div
                          key={message.id}
                          className={`flex m-3  ${
                            message.isUser === true
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.isUser === true
                                ? "bg-white text-black"
                                : "bg-teal-700 text-white"
                            }`}
                          >
                            <div className="w-full flex justify-end">
                              {message.message_content}
                              <p className="text-xs text-gray-400  flex items-end ml-4">
                                {message.timestamp
                                  ? formatTime(message.timestamp)
                                  : formatTime(new Date())}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-warm_grey h-3/4">
                    <span>
                      <BiMessageDetail className="w-12 h-12" />
                    </span>
                    <p className="font-semibold">
                      Pesan masih kosong, yuk mulai chat pertamamu
                    </p>
                  </div>
                )}
                {/* Ref element to scroll to the bottom */}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik sebuah pesan"
                  className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500"
                  maxLength={1000}
                />
                <button
                  onClick={() => handleSendMessage(userSelected)}
                  className="px-6 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors"
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-3/4 text-warm_grey ">
            <span>
              <MdOutlineMessage className="w-12 h-12" />
            </span>
            <p className="font-semibold">Pilih user untuk memulai chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;

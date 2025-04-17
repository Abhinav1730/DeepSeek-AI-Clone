"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [message, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        {/*---------SideBar--------------- */}
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              className="rotate-180"
              alt=""
              src={assets.menu_icon}
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
            />
            <Image className="opacity-70" alt="" src={assets.chat_icon} />
          </div>
          {message.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image alt="" src={assets.logo_icon} className="h-16"/>
                <p className="text-2xl font-medium">Hi! , I am DeepSeek</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ) : (
            <div></div>
          )}
          {/*-------------Prompt Box--------------*/}
          <p className="text-xs absolute bottom-1 text-gray-500">AI-genrated for reference only</p>
        </div>
      </div>
    </div>
  );
}

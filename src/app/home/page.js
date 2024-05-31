"use client";
import { useEffect, useState } from "react";
import HorizontalNavbar from "@/component/dashboard/Horizontal/HorizontalNavbar";
import VerticalNavbar from "@/component/dashboard/Vertical/VerticalNavbar";
import { getUser } from "@/api/userService";
import { getUserCookie } from "@/util/getCookie";
import Content from "@/component/dashboard/Content/Content";
import AdminContent from "@/component/dashboard/Content/Admin/AdminContent";

export default function Home() {
  const [user, setUser] = useState(null);
  const [currentContent, setCurrentContent] = useState({ title: "MENU" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
        console.log(fetchedUser);
      } catch {
        setUser(null);
      }
    };

    const userInfo = getUserCookie();
    if (!userInfo) {
      fetchUser();
    } else {
      setUser(userInfo);
      console.log(userInfo);
    }
  }, []);

  useEffect(() => {
    console.log(currentContent);
  }, [currentContent]);

  return (
    <>
      <HorizontalNavbar user={user} />
      <VerticalNavbar user={user} setCurrentContent={setCurrentContent} />
      {currentContent.title !== "ADMIN" && (
        <Content currentContent={currentContent} />
      )}
      {currentContent.title === "ADMIN" && <AdminContent currentContent={currentContent}/>}
    </>
  );
}

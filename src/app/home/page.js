"use client";
import { useEffect, useState } from "react";
import HorizontalNavbar from "@/component/dashboard/Horizontal/HorizontalNavbar";
import VerticalNavbar from "@/component/dashboard/Vertical/VerticalNavbar";
import { addCart, getUser } from "@/api/userService";
import { getUserCookie } from "@/util/getCookie";
import Content from "@/component/dashboard/Content/Content";
import AdminContent from "@/component/dashboard/Content/Admin/AdminContent";

export default function Home() {
  const [user, setUser] = useState(null);
  const [currentContent, setCurrentContent] = useState({ title: "Menu" });
  const [cart, setCart] = useState([]);

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
    console.log(cart);
  }, [cart]);

  return (
    <>
      <HorizontalNavbar user={user} />
      <VerticalNavbar user={user} setCurrentContent={setCurrentContent} />
      {currentContent.title !== "ADMIN" && (
        <Content
          currentContent={currentContent}
          user={user}
          setCart={setCart}
          cart={cart}
        />
      )}
      {currentContent.title === "ADMIN" && (
        <AdminContent currentContent={currentContent} />
      )}
    </>
  );
}

"use client";
import HomePageLayout from "@/component/dashboard/HomePageLayout";
import HorizontalNavbar from "@/component/dashboard/Horizontal/HorizontalNavbar";
import VerticalNavbar from "@/component/dashboard/Vertical/VerticalNavbar";

export default function Home() {
  return (
    <HomePageLayout>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div style={{ width: "100%", position: "fixed", top: 0, left: 0 }}>
          <HorizontalNavbar />
        </div>
        <div
          style={{
            flex: 1,
            padding: "10px",
            width: "10em",
            marginTop: "5em",
            position: "fixed",
            left: 0,
            height: "95%",
          }}
        >
          <VerticalNavbar />
        </div>
      </div>
    </HomePageLayout>
  );
}

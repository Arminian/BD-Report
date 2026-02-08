import { Outlet } from "react-router";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

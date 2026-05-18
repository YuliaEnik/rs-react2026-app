import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";
import Navigation from "../Components/Navigate/Navigate";
import Footer from "../Components/Footer/Footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="header">
        <Navigation />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  ),
});

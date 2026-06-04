import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingButton from "../../components/FloatingButton";
import AnnouncementBar from "../../components/AnnouncementBar";
import DeferredWidgets from "../../components/DeferredWidgets";

export default function MainLayout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <FloatingButton />
      <Footer />
      <DeferredWidgets />
    </>
  );
}

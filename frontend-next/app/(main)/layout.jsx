import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingButton from "../../components/FloatingButton";
import ScrollToTop from "../../components/ScrollToTop";
import AnnouncementBar from "../../components/AnnouncementBar";

export default function MainLayout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <FloatingButton />
      <Footer />
      <ScrollToTop />
    </>
  );
}

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingButton from "../../components/FloatingButton";
import ScrollToTop from "../../components/ScrollToTop";
import AnnouncementBar from "../../components/AnnouncementBar";
import Chatbot from "../../components/Chatbot/index";

export default function MainLayout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <FloatingButton />
      <Footer />
      <ScrollToTop />
      <Chatbot />
    </>
  );
}

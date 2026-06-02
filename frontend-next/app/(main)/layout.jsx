import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingButton from "../../components/FloatingButton";
import ScrollToTop from "../../components/ScrollToTop";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <FloatingButton />
      <Footer />
      <ScrollToTop />
    </>
  );
}

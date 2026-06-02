import AdminGuard from "../../components/AdminGuard";

export const metadata = {
  title: "Admin | Printkee",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminGuard>{children}</AdminGuard>;
}

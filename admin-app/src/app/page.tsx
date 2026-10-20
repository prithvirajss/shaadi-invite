import { isAuthenticated } from "./actions";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}

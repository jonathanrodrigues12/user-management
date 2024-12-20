import ProtectedLayout from "@/app/protected-layout";

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Bem-vindo ao painel principal!</p>
    </ProtectedLayout>
  );
}

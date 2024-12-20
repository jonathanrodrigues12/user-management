import UserList from "@/components/UserList";
import ProtectedLayout from "../protected-layout";

export default function UserManagementPage() {
  return (
    <ProtectedLayout>
    <div>
      
      <UserList />
    </div>
    </ProtectedLayout>
  );
}

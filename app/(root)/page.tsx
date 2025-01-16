import UsersForm from "@/components/shared/users-form";
import { getAllUsers } from "@/lib/actions/user.actions";

export default async function Home() {
  const users = await getAllUsers();

  // console.log("all users", users);

  return (
    <div className="space-y-8">
      <h2 className="h2-bold">List of Users</h2>
      <div className="overflow-x-auto">
        <UsersForm users={users} />
        {/* {users.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        )} */}
      </div>
    </div>
  );
}

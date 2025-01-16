import UpdateUserForm from "@/components/update-user-form";
import { getSingleUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update user",
};

const UserDetailPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const user = await getSingleUserById(id);

  if (!user) return notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">Update User</h1>

      <UpdateUserForm
        user={
          user as {
            email: string;
            name: string;
            id: string;
            surname: string;
            dateOfBirth: Date;
          }
        }
      />
    </div>
  );
};

export default UserDetailPage;

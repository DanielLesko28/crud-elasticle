import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteDialog from "./delete-dialog";
import { deleteUser } from "@/lib/actions/user.actions";
import { auth } from "@/auth";

interface UserProps {
  id: string;
  name: string;
  surname: string;
  email: string;
  emailVerified?: Date | null;
  password?: string | null;
  dateOfBirth?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
const UsersForm = async ({ users }: { users: UserProps[] }) => {
  const session = await auth();

  // console.log("session", session);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>NAME</TableHead>
            <TableHead>SURNAME</TableHead>
            <TableHead>DATE OF BIRTH</TableHead>
            <TableHead>EMAIL</TableHead>
            {session?.user && <TableHead>ACTIONS</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {/* <TableCell>{formatId(user.id)}</TableCell> */}
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>
                {" "}
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString("en-UK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              {session?.user && (
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/users/${user.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={user.id} action={deleteUser} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersForm;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { getUsers } from "../../api/user-api";
import { useAuth } from "../../store/user-store";
import { Input } from "@/components/ui/input";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState('');
    const { token } = useAuth() as { token: string };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers(token);
                setUsers(res.data);
                setAllUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.log('Failed to fetch users: ', err);
            }
        }
        fetchUsers()
    },[]);

    const searchUsers = (e:any) => {
        const value = e.target.value;
        setKey(value);

        const q = value.toLowerCase().trim();

        if (!q) {
            setUsers(allUsers);
            return;
        }

        setUsers(
            allUsers.filter((u: any) => {
                const name = (u.name ?? "").toLowerCase();
                const email = (u.email ?? "").toLowerCase();
                return name.includes(q) || email.includes(q);
            })
        );
    };

    return (
        <>
            <h1 className="text-4xl mb-3">Users</h1>
            <Input type="text" value={key} onChange={searchUsers} className="w-auto max-w-lg mb-4" placeholder="Search users"/>
            <div>
                {loading ? (
                    <p className="text-red-600">Loading users...</p>
                ) : (
                    <Table>
                    <TableHeader>
                        <TableRow className="text-lg font-bold">
                            <TableHead>S.No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Events Registered</TableHead>
                            <TableHead>Events Attended</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: any, index: number) => (
                          <TableRow key={user._id || index} className="text-md">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.eventsRegistered}</TableCell>
                            <TableCell>{user.eventsAttended}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
            </div>
        </>
    )
}

export default Users;
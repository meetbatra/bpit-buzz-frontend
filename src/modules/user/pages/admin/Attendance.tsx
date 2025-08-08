import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRegisteredUsers, markAttendance } from "@/modules/event/api/event-api";
import { useAuth } from "../../store/user-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Attendance = () => {
    const [registrations, setRegistrations] = useState([]);
    const [allRegistrations, setAllRegistrations] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState('');
    const { eventId } = useParams();
    const { token } = useAuth() as { token:string };

    useEffect(() => {
        fetchRegistrations()
    }, [eventId]);

    const fetchRegistrations = async () => {
        try {
            const res = await getRegisteredUsers(eventId, token);
            setRegistrations(res.data.users);
            setAllRegistrations(res.data.users);
            setTitle(res.data.title);
            setLoading(false);
        } catch (err) {
            console.log('Failed to fetch users: ', err);
        }
    }

    const markUserAttendance = async (userId:any) => {
        try{
            const res = await markAttendance(eventId, userId, token)
            console.log(res.data.message);
            await fetchRegistrations();
        } catch (err) {
            console.log("Error in Attendance", err)
        }
    }

    const searchUsers = (e:any) => {
        const value = e.target.value;
        setKey(value);

        const q = value.toLowerCase().trim();

        if (!q) {
            setRegistrations(allRegistrations);
            return;
        }

        setRegistrations(
            allRegistrations.filter((r: any) => {
                const name = (r.student.name ?? "").toLowerCase();
                const email = (r.student.email ?? "").toLowerCase();
                return name.includes(q) || email.includes(q);
            })
        );
    };

    return (
        <>
            <h1 className="text-3xl mb-5">{ title }</h1>
            <h4 className="text-xl mb-3">Mark Attendance</h4>
            <Input type="text" value={key} onChange={searchUsers} className="sm:w-64 mb-2" placeholder="Search users"/>
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
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registrations.map((registration: any, index: number) => (
                          <TableRow key={registration.student._id} className="text-md">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{registration.student.name}</TableCell>
                            <TableCell>{registration.student.email}</TableCell>
                            <TableCell>
                                {!registration.attendanceMarked ? (
                                    <Button className="h-[1.5rem] w-[7rem] text-md cursor-pointer" onClick={() => markUserAttendance(registration.student._id)}>Mark Present</Button>
                                ) : (
                                    <p>Present</p>
                                )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
            </div>
        </>
    )
}

export default Attendance;
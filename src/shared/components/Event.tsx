import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/user/store/user-store";
import { registerUser } from "@/modules/user/api/user-api";
import { toast } from "react-toastify";

export const Event = ({event}:any) => {
    const { user, token } = useAuth();
    const isAdmin  = user?.role === 'admin'
    const navigate = useNavigate();
    const getDate = (date:string) => {
        const d = new Date(date);
        return d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
    }

    const register = async () => {
        if(!user){
          navigate('/login');
          return;
        }

        try {
            const res = await registerUser(user?._id, event._id, token);
            toast.success(res.data.message);
        } catch (err:any) {
            console.log("Error in registration");
            toast.error(err.response.data.message);
        }
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <img
                    src={event.posterUrl}
                    alt={event.title}
                    className="rounded-md h-[20rem] w-full object-cover"
                />
                <CardTitle className="text-start text-3xl">
                    {event.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{event.description}</p>
                <p>{getDate(event.date)}</p>
                <p>{event.location}</p>
                {isAdmin ? (
                  <Button className="w-full mt-4">
                    <Link
                      to={`/admin/users/attendance/${event._id}`}
                      className="w-full"
                    >
                      Mark Attendance
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full mt-4 cursor-pointer"
                    onClick={register}
                  >
                    Register
                  </Button>
                )}
            </CardContent>
        </Card>
    )
}
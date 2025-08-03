import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/user/store/user-store";
import { registerUser } from "@/modules/user/api/user-api";
import { toast } from "react-toastify";
import { format } from "date-fns";

export const Event = ({event}:any) => {
    const { user, token } = useAuth();
    const isAdmin  = user?.role === 'admin'
    const navigate = useNavigate();
    const getDate = (date: string) => {
      // Format date and time
      return format(new Date(date), "PPP");
    };

    // Format time in 12-hour format with am/pm
    const getTime = (timeStr: string) => {
      const [hour, minute] = timeStr.split(":").map(Number);
      const date = new Date();
      date.setHours(hour);
      date.setMinutes(minute);
      return format(date, "hh:mm a");
    };

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
      <div className="flex flex-col h-full">
        <Card className="flex flex-col flex-1">
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
          <CardContent className="flex flex-col flex-1 justify-between">
            <Button>Show Info</Button>
          </CardContent>
        </Card>
      </div>
    )
}
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/user/store/user-store";
import { addFeedback, registerUser } from "@/modules/user/api/user-api";
import { toast } from "react-toastify";
import EventDetails from "@/shared/components/EventDetails"
import FeedbackModal from "@/shared/components/FeedbackModal";
import { Star } from "lucide-react";

interface EventType {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  posterUrl: string;
  feedback?: {
    rating: number;
    comment: string;
  };
  attendanceMarked: boolean
}

interface EventProps {
  event: EventType;
  view: string;
}

export const Event = ({ event, view }: EventProps) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const register = async () => {
      if(!user){
        navigate('/login');
        return;
      }

      try {
          const res = await registerUser(user?._id, event._id, token);
          toast.success(res.data.message);
      } catch (err:any) {
          console.log("Error in registration", err);
          toast.error(err.response.data.message);
      }
  }

  const feedback = async (rating: any, message: any) => {
    try {
      const res = await addFeedback(user?._id, event._id, token, rating, message);
      toast.success(res.data.message);
    } catch (err:any) {
      console.log("Error in adding feedback");
      toast.error(err.response.data.message)
    }
  }

  return (
    <div >
      <Card className="h-[27rem]">
        <CardHeader className="text-center">
          <img
            src={event.posterUrl}
            alt={event.title}
            className="rounded-md h-[18rem] w-full object-cover"
          />
          <CardTitle className="text-start text-2xl">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {view === 'home' && (
            <EventDetails
              event={event}
              trigger={<Button className="w-full cursor-pointer">Show Info</Button>}
              onRegister={register}
            />
          )}
          {view === 'student' && ( event.attendanceMarked ? (
            event.feedback && event.feedback.rating ? (
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        event.feedback && i < event.feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                  <p className="text-sm italic text-green-700">Reviewed</p>
              </div>
            ) : (
              <FeedbackModal
                trigger={<Button className="w-full cursor-pointer">Give Feedback</Button>}
                onSubmit={feedback}
              />
            )
          ) : (
            <p className="text-red-600">Attendance not marked</p>
          ))}
          {view === 'admin' && (
            <Button asChild className="w-full">
              <Link to={`/admin/users/attendance/${event._id}`}>
                Mark Attendance
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
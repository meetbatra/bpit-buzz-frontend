import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Angry, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { eventSchema } from "../../../event/validation/event-validation";
import { Textarea } from "@/components/ui/textarea";
import { addEvent } from "@/modules/event/api/event-api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/user-store";
import { toast } from "react-toastify";

const NewEvent = () => {
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useAuth();
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            description: '',
            date: '',
            time: '',
            location:'',
            poster: undefined
        }
    });

    const eventSubmit = async (eventData:any) => {
        console.log(eventData);
        try {
            setLoading(true);
            const eventFormData = new FormData();

            eventFormData.append('title', eventData.title);
            eventFormData.append('description', eventData.description);
            eventFormData.append('date', eventData.date);
            eventFormData.append('time', eventData.time);
            eventFormData.append('location', eventData.location);
            eventFormData.append('poster', eventData.poster[0]);

            const res = await addEvent(eventFormData, token);
            setStatus(false);
            toast.success(res.data.message);
            navigate('/admin');
            setLoading(false);
        } catch (err:any) {
            setStatus(true);
            setMessage(err.response.data.message);
            setLoading(false);
        }
    }

    return(
        <div className="flex items-center h-full">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle>Add an Event</CardTitle>
                </CardHeader>
                <CardContent>
                    {status && (
                        <div>
                            <Alert variant="destructive">
                                <Angry />
                                <AlertTitle>An error occurred</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(eventSubmit)}>
                        <div  className="my-3">
                            <Label htmlFor="title" className="mb-2">Title</Label>
                            <Input {...register('title')} type="text" id="title" placeholder="Enter title"></Input>
                            <span className="text-red-500 text-xs">{errors.title?.message}</span>
                        </div>
                        <div  className="my-3">
                            <Label htmlFor="description" className="mb-2">Description</Label>
                            <Textarea {...register('description')} id="description" placeholder="Enter description"></Textarea>
                            <span className="text-red-500 text-xs">{errors.description?.message}</span>
                        </div>
                        <div  className="my-3 w-full">
                            <Label htmlFor="date" className="mb-2">Date</Label>
                            <Input {...register('date')} type="date" id="date"></Input>
                            <span className="text-red-500 text-xs">{errors.date?.message}</span>
                        </div>
                        <div className="my-3 w-full">
                            <Label htmlFor="time" className="mb-2">Time</Label>
                            <Input {...register('time')} type="time" id="time" ></Input>
                            <span className="text-red-500 text-xs">{errors.time?.message}</span>
                        </div>
                        <div  className="my-3">
                            <Label htmlFor="location" className="mb-2">Location</Label>
                            <Input {...register('location')} type="text" id="location" placeholder="Enter location"></Input>
                            <span className="text-red-500 text-xs">{errors.location?.message}</span>
                        </div>
                        <div  className="my-3">
                            <Label htmlFor="poster" className="mb-2">Poster</Label>
                            <Input {...register('poster')} type="file" id="poster" name="poster" accept=".jpg,.jpeg,image/jpeg"></Input>
                            <span className="text-red-500 text-xs">{errors.poster?.message}</span>
                        </div>
                        <Button className="w-full mt-2 cursor-pointer" disabled={loading}>
                            {loading ? (
                              <div className="flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                              </div>
                            ) : (
                              "Add"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewEvent;
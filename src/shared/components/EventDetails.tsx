import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";

interface EventDetailsProps {
    event: {
        title: string;
        description: string;
        date: string;
        time: string;
        location: string;
        posterUrl: string;
    };
    trigger: React.ReactNode;
    onRegister?: () => void;
}

const EventDetails = ({ event, trigger, onRegister }: EventDetailsProps) =>  {
    const [open, setOpen] = useState(false);

    const getDate = (date: string) => {
        return format(new Date(date), "PPP");
    };

    const getTime = (timeStr: string) => {
        const [hour, minute] = timeStr.split(":").map(Number);
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        return format(date, "hh:mm a");
    };

    const handleRegister = () => {
        onRegister?.();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                className="md:w-[45rem] min-w-[20rem] p-0 border-none"
            >
                <DialogTitle className="sr-only">{event.title}</DialogTitle>
                <DialogDescription className="sr-only">{event.description}</DialogDescription>
                <div className="absolute inset-0 bg-black/80 z-0" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-7 w-full">
                    <img
                        src={event.posterUrl}
                        alt={event.title}
                        className="w-[20rem] h-[20rem] rounded shadow-2xl object-cover"
                    />
                    <div className="text-white space-y-3 max-w-md">
                        <h2 className="text-4xl font-bold">{event.title}</h2>
                        <p className="text-md">{event.description}</p>
                        <p className="text-lg flex items-center gap-2">
                            <Calendar />{getDate(event.date)}
                        </p>
                        <p className="text-lg flex items-center gap-2">
                            <Clock />{getTime(event.time)}
                        </p>
                        <p className="text-lg flex items-center gap-2">
                            <MapPin />{event.location}
                        </p>
                        <Button className="mt-5 w-full bg-black cursor-pointer" onClick={handleRegister}>Register</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EventDetails;
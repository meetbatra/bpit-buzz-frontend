import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getEvents } from "@/modules/event/api/event-api";
import { useEffect, useState } from "react";
import { Event } from "../../../../shared/components/Event";
import { Input } from "@/components/ui/input";

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

const Events = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [allEvents, setAllEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {

        const fetchEvents = async () => {
            try {
                const res = await getEvents()
                setEvents(res.data);
                setAllEvents(res.data);
                setLoading(false)
            } catch (err) {
                console.log('Unable to fetch events');
            }
        }

        fetchEvents();
    }, [])

    const searchEvents = (e:any) => {
        const value = e.target.value;
        setQuery(value);

        const q = value.toLowerCase().trim();

        if(!q){
            setEvents(allEvents);
            return;
        }

        setEvents(
            allEvents.filter(e => {
                const title = e.title.toLowerCase();
                return title.includes(q);
            })
        )
    }

    return (
        <div>
            <h1 className="text-4xl mb-3">Events</h1>
            <div className="flex flex-col sm:flex-row gap-2">
                <Link to="/admin/events/new"><Button variant="outline" className="cursor-pointer"><Plus />Add new Event</Button></Link>
                <Input type="text" placeholder="Search.." value={query} onChange={searchEvents} className="sm:ml-auto sm:w-64"/>
            </div>
            <div>
                {loading ? (
                    <p className="text-red-600">Loading events...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4">
                        {events.map((ev) => (
                            <Event key={ev._id} view="admin-events" event={ev}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Events;
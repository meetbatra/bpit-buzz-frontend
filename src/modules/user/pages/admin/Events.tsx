import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getEvents } from "@/modules/event/api/event-api";
import { useEffect, useState } from "react";
import { Event } from "../../../../shared/components/Event";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchEvents = async () => {
            try {
                const res = await getEvents()
                setEvents(res.data);
                setLoading(false)
            } catch (err) {
                console.log('Unable to fetch events');
            }
        }

        fetchEvents();
    }, [])

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">Events</h1>
            <Link to="/admin/events/new"><Button variant="outline" className="cursor-pointer"><Plus />Add new Event</Button></Link>
            <div>
                {loading ? (
                    <p className="text-red-600">Loading events...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4">
                        {events.map((ev) => (
                            <Event key={(ev as any)._id} view="admin-events" event={ev}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Events;
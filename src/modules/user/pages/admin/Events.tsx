import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getEvents } from "@/modules/event/api/event-api";
import { useEffect, useState } from "react";
import { Event } from "../../../../shared/components/Event";
import { useAuth } from "../../store/user-store";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        user?.role != "admin" && navigate('/login')

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-6">
                        {events.map((ev) => (
                            <Event key={(ev as any)._id} event={ev}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Events;
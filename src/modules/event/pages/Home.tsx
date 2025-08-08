import { Event } from "@/shared/components/Event";
import { useEffect, useState } from "react";
import { getEvents } from "../api/event-api";
import { Input } from "@/components/ui/input";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchToday, setSearchToday] = useState("");
    const [searchUpcoming, setSearchUpcoming] = useState("");
    
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventsToday = events.filter((ev: any) => {
        const eventDate = new Date(ev.date);
        eventDate.setHours(0, 0, 0, 0);
        return (
            eventDate.getTime() === today.getTime() &&
            ev.title.toLowerCase().includes(searchToday.toLowerCase())
        );
    });

    const upcomingEvents = events.filter((ev: any) => {
        const eventDate = new Date(ev.date);
        eventDate.setHours(0, 0, 0, 0);
        return (
            eventDate.getTime() > today.getTime() &&
            ev.title.toLowerCase().includes(searchUpcoming.toLowerCase())
        );
    });

    return (
        <div className="space-y-6 p-8">
            {loading ? (
                <p className="text-red-600">Loading Events...</p>
            ) : (
                <>
                    <section>
                        <h2 className="text-2xl font-bold mb-5">Events Today</h2>
                        {eventsToday.length === 0 ? (
                            <p className="text-red-600">No events today.</p>
                        ) : (
                            <>
                                <Input
                                type="text"
                                placeholder="Search today's events..."
                                value={searchToday}
                                onChange={(e) => setSearchToday(e.target.value)}
                                className="mb-2 sm:w-64"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {eventsToday.map((event: any) => <Event key={event._id} view="home" event={event} />)}
                                </div>
                            </>
                        )}
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-5">Upcoming Events</h2>
                        {upcomingEvents.length === 0 ? (
                            <p className="text-red-600">No upcoming events.</p>
                        ) : (
                            <>
                                <Input
                                type="text"
                                placeholder="Search upcoming events..."
                                value={searchUpcoming}
                                onChange={(e) => setSearchUpcoming(e.target.value)}
                                className="mb-2 sm:w-64"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {upcomingEvents.map((event: any) => <Event key={event._id} view="home" event={event} />)}
                                </div>
                            </>
                        )}
                    </section>
                </>
            )}
        </div>
    )
}

export default Home;
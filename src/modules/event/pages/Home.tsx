import { Event } from "@/shared/components/Event";
import { useEffect, useState } from "react";
import { getEvents } from "../api/event-api";

const Home = () => {
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventsToday = events.filter((ev: any) => {
      const eventDate = new Date(ev.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    });

    const upcomingEvents = events.filter((ev: any) => {
      const eventDate = new Date(ev.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() > today.getTime();
    });

    return (
      <div className="space-y-6 p-8">
        {loading ? (
            <p className="text-red-600">Loading Events...</p>
        ) : (
            <>
            <section>
            <h2 className="text-2xl font-bold mb-4">Events Today</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {eventsToday.length === 0 ? (
                <p>No events today.</p>
                ) : (
                eventsToday.map((event: any) => <Event key={event._id} view="home" event={event} />)
                )}
            </div>
            </section>
            <section>
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {upcomingEvents.length === 0 ? (
                <p>No upcoming events.</p>
                ) : (
                upcomingEvents.map((event: any) => <Event key={event._id} view="home" event={event} />)
                )}
            </div>
        </section>
        </>
        )}
      </div>  
    )
}

export default Home;
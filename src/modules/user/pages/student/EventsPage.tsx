import { useEffect, useState } from "react";
import { getEvents } from "../../api/user-api";
import { useAuth } from "../../store/user-store";
import { Event } from "@/shared/components/Event";

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  poster: string;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents(user?._id, token);
        setEvents(res.data);
        setFilteredEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching registered events:", err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const today = new Date();

    const newEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      if (filter === "today") {
        return (
          eventDate.getDate() === today.getDate() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getFullYear() === today.getFullYear()
        );
      } else if (filter === "future") {
        return eventDate > today;
      }
      return true;
    });

    setFilteredEvents(newEvents);
  }, [filter, events]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Events</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Events</option>
          <option value="today">Events Today</option>
          <option value="future">Future Events</option>
        </select>
      </div>

      {loading ? (
        <p className="text-red-600">Loading events...</p>
      ) : filteredEvents.length === 0 ?  (
        <p className="text-red-600">No events found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
                <Event event={event} key={event._id}/>
            ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
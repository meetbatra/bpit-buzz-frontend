import { useEffect, useState } from "react";
import { getEvents } from "../../api/user-api";
import { useAuth } from "../../store/user-store";
import { Event } from "@/shared/components/Event";
import { Input } from "@/components/ui/input";

interface Event {
  _id: string; // Assuming _id is present
  title: string; // Changed from 'name' to 'title'
  description: string;
  date: string;
  time: string;
  location: string;
  posterUrl: string; // Changed from 'poster' to 'posterUrl'
  attendanceMarked: boolean;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState('');
  const { user, token } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents(user?._id, token);
      setEvents(res.data);
      setAllEvents(res.data);
      setFilteredEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching registered events:", err);
    }
  };

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
    <>
      <h1 className="text-4xl mb-5">My Events</h1>
      <div className="flex sm:flex-row flex-col gap-2 mb-2">
        <Input type="text" value={query} onChange={searchEvents} placeholder="Search..." className="sm:w-64" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded w-37 sm:ml-auto"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event:Event) => (
                <Event event={event} view="student" refreshEvents={fetchEvents} key={event._id}/>
            ))}
        </div>
      )}
    </>
  );
};

export default EventsPage;
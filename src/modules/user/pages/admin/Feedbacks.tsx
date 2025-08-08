import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useAuth } from "../../store/user-store";
import { getFeedbacks } from "@/modules/event/api/event-api";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface Feedback {
    _id: string;
    rating: number;
    comment: string;
    user: {
        name: string;
    };
}

const Feedbacks = () => {
    const { token } = useAuth();
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [allFeedback, setAllFeedback] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const { eventId } = useParams();

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await getFeedbacks(eventId, token);
                const formatted = res.data.map((item: any) => ({
                    _id: item._id,
                    rating: item.feedback.rating,
                    comment: item.feedback.comment,
                    user: {
                        name: item.student.name
                    }
                }));
                setFeedback(formatted);
                setAllFeedback(formatted);
                setLoading(false);
            } catch (err) {
                console.log('Error in fetching feedbacks', err);
            }
        }
        fetchFeedback();
    }, [eventId, token]);

    const searchFeedback = (e:any) => {
        const value = e.target.value;
        setQuery(value);

        const q = value.toLowerCase().trim();

        if(!q){
            setFeedback(allFeedback);
            return;
        }

        setFeedback(
            allFeedback.filter(f => {
                const title = f.user.name.toLowerCase().trim();
                return title.includes(q);
            })
        );
    }

    return (
        <>
            <h1 className="text-4xl mb-5">Feedbacks</h1>
            <Input type="text" value={query} onChange={searchFeedback} placeholder="Search..." className="sm:w-64 mb-2" />
            {loading ? (
                <p className="text-red-600">Loading feedbacks...</p>
            ) : feedback.length === 0 ? (
                <p className="text-red-600">No feedback found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {feedback.map((feedback) => (
                    <Card key={feedback._id}>
                        <CardHeader>
                            <CardTitle className="italic">@{feedback.user.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center mb-2">
                                {[1,2,3,4,5].map((i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 mr-1 ${i <= feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                />
                                ))}
                            </div>
                            <p className="text-sm text-gray-700 italic">{feedback.comment}</p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            )}
        </>
    );
}

export default Feedbacks;
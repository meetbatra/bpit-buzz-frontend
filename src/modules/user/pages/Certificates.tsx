import { useEffect, useState } from "react";
import { useAuth } from "../store/user-store";
import { getCertificates } from "../api/user-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Certificates = () => {
    const { user, token } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    
    useEffect(() => {
        !user && navigate('/login');

        const fetchCertificates = async () => {
            try {
                const res = await getCertificates(user?._id, token);
                setCertificates(res.data);
                setLoading(false);
            } catch (err) {
                console.log("Error in certi");
            }
        }

        fetchCertificates()
    },[user]);

    return (
        <div className="p-5">
            <h1 className="text-4xl mb-5 font-bold">My Certificates</h1>
            <div>
                {loading ? (
                    <p className="text-red-600">Loading certificates...</p>
                ) : certificates.length === 0 ? (
                    <p className="text-red-600">No certificates available</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((certi:any) => (
                            <Card key={certi._id}>
                                <CardHeader>
                                    <CardTitle className="text-center font-bold">
                                        Certificate of Participation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-center">
                                    <p className="text-sm">
                                        This is to certify that <strong>{user?.name ?? "the participant"}</strong> has successfully attended the event <strong>{certi.event.title}</strong> held on {certi.event.date ? new Date(certi.event.date).toLocaleDateString() : "N/A"}{" "}at <strong>{certi.event.location ?? "the campus"}</strong>.
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Certificates;
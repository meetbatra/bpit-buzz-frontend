import { useEffect, useState } from "react";
import { useAuth } from "../../store/user-store";
import { getCertificates } from "../../api/user-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Certificates = () => {
    const { user, token } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [allCertificates, setAllCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        !user && navigate('/login');

        const fetchCertificates = async () => {
            try {
                const res = await getCertificates(user?._id, token);
                setCertificates(res.data);
                setAllCertificates(res.data);
                setLoading(false);
            } catch (err) {
                console.log("Error in certi");
            }
        }

        fetchCertificates()
    },[user]);

    const searchCertificates = (e:any) => {
        const value = e.target.value;
        setQuery(value);

        const q = value.toLowerCase().trim();

        if(!q){
            setCertificates(allCertificates);
            return;
        }

        setCertificates(
            allCertificates.filter(c => {
                const title = (c as any).event.title.toLowerCase().trim();
                return title.includes(q);
            })
        );
    }

    return (
        <>
            <h1 className="text-4xl mb-5">My Certificates</h1>
            <Input type="text" value={query} onChange={searchCertificates} placeholder="Search..." className="sm:w-64 mb-2" />
            <div>
                {loading ? (
                    <p className="text-red-600">Loading certificates...</p>
                ) : certificates.length === 0 ? (
                    <p className="text-red-600">No certificates available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </>
    )
}

export default Certificates;
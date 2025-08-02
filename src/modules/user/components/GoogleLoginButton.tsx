import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/modules/user/store/user-store";
import { toast } from "react-toastify";
import { googleLogin } from '../api/user-api';

// Add global type declaration for window.google
declare global {
    interface Window {
        google: any;
    }
}

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleGoogleLogin = () => {
        const client = window.google.accounts.oauth2.initTokenClient({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            scope: 'profile email',
            callback: async (response:any) => {
                try {
                    const res = await googleLogin(response.access_token);

                    if (res.data.token) {
                        login({ user: res.data.user, token: res.data.token });
                        toast.success("Welcome " + res.data.user.name);
                        navigate('/');
                    } else {
                        console.error(res.data.message);
                    }
                } catch (err:any) {
                    console.error("Google login error", err);
                    toast.error(err.response.data.message);
                }
            },
        });

        client.requestAccessToken();
    };

    return (
        <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 bg-white text-gray-600 font-medium px-4 py-2 rounded-md shadow cursor-pointer w-full"
        >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-5 h-5" />
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/login-validation";
import { loginUser } from "../../api/user-api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Angry } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/modules/user/store/user-store";
import { toast } from "react-toastify";
import GoogleLoginButton from "@/modules/user/components/GoogleLoginButton"

const Login = () => {
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email:'',
            password:''
        }
    });

    const loginSubmit = async (userData:unknown) => {
        try {
            const res = await loginUser(userData);
            if (res.data.token) {
                login({ user: res.data.user, token: res.data.token });
                setStatus(false);
                toast.success("Welcome back " + res.data.user.name);
                navigate('/');
            } else {
                setStatus(true);
            }
        } catch (err:any) {
            setStatus(true);
            setMessage(err.response.data.message);
        }
    }

    return (
        <div className="flex items-center h-full">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle>Login to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    {status && (
                        <div>
                            <Alert variant="destructive">
                                <Angry />
                                <AlertTitle>An error occurred</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(loginSubmit)}>
                        <div  className="my-3">
                            <Label htmlFor="email" className="mb-2">Email</Label>
                            <Input {...register('email')} type="email" id="email" placeholder="Enter your email"></Input>
                            <span className="text-red-500 text-xs">{errors.email && errors.email.message}</span>
                        </div>
                        <div  className="my-3">
                            <Label htmlFor="password" className="mb-2">Password</Label>
                            <Input {...register('password')} type="password" id="password" placeholder="Enter your password"></Input>
                            <span className="text-red-500 text-xs">{errors.password && errors.password.message}</span>
                        </div>
                        <Button className="w-full mt-2 cursor-pointer">Login</Button>
                    </form>
                    <p className="text-center my-4 text-gray-600">OR</p>
                    <div className="flex justify-center">
                        <GoogleLoginButton />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login;
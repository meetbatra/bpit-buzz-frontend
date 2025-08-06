import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Angry } from 'lucide-react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../validation/signup-validation";
import { signupUser } from "../../api/user-api";
import { useAuth } from "@/modules/user/store/user-store"
import { toast } from "react-toastify";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Signup = () => {
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user,login } = useAuth()
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name:'',
            email:'',
            password:''
        }
    });

    useEffect(() => {
            user && navigate('/');
        });

    const signupSubmit = async (userData:unknown) => {
        console.log('Form Submit ', userData);
        try {
            const res = await signupUser(userData);
            if(res.data.token){
                setStatus(false);
                const hasToken = res?.data?.token && res?.data?.user;
                if (hasToken) {
                    login({ user: res.data.user, token: res.data.token });
                    toast.success("Welcome to BPIT Buzz")
                    navigate("/");
      }
            }
        } catch (err: any) {
            setStatus(true);
            setMessage(err.response.data.message);
        }
    }

    return (
        <div className="flex items-center h-full">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle>Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    { status && (
                        <div>
                            <Alert variant="destructive">
                                <Angry />
                                <AlertTitle>An error occurred</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(signupSubmit)}>
                        <div className="my-3">
                            <Label htmlFor="name" className="mb-2">Name</Label>
                            <Input {...register('name')} type="text" id="name" placeholder="Enter your name"></Input>
                            <span className="text-red-500 text-xs">{errors.name && errors.name.message}</span>
                        </div>
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
                        <Button className="w-full mt-2 cursor-pointer">Register</Button>
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

export default Signup;
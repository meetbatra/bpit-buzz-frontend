import {z} from 'zod';

export const signupSchema = z.object({
    name: z.string().min(3, 'Name should have 3 characters minimum').max(10, 'Name cannot exceed 10 characters'),
    email: z.string().min(1,'Email is required').email('Please enter valid email'),
    password: z.string().min(8, 'Password must be of 8 or more characters').max(20, 'Password should not be more tha 20 characters'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
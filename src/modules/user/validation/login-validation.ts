import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1,'Email is required').email('Please enter valid email'),
    password: z.string().min(8, 'Password must be of 8 or more characters').max(20, 'Password should not be more tha 20 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
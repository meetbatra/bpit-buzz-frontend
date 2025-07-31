import {z} from 'zod';

export const eventSchema = z.object({
    title: z.string().min(3, 'Title should have 3 characters minimum').max(20, 'Title cannot exceed 10 characters'),
    description: z.string().min(1,'Description is required'),
    date: z.string().min(1, 'Date is required').refine((value) => {
        const today = new Date();
        const selected = new Date(value);
        today.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0);
        return selected >= today;
    }, 'Date must be today or in the future'),
    location: z.string().min(1,'Location is required'),
    poster: z.any().refine((files) => files && files.length > 0, 'Poster image is required')
});

export type EventSchema = z.infer<typeof eventSchema>;
import {z} from 'zod';

export const eventSchema = z.object({
    title: z.string().min(3, 'Title should have 3 characters minimum').max(20, 'Title cannot exceed 20 characters'),
    description: z.string().min(1,'Description is required'),
    date: z.string().min(1, 'Date is required').refine((value) => {
        const today = new Date();
        const selected = new Date(value);
        today.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0);
        return selected >= today;
    }, 'Date must be today or in the future'),
    time: z.string().min(1, 'Time is required'),
    location: z.string().min(1,'Location is required'),
    poster: z.instanceof(FileList)
        .refine((files) => files.length > 0, 'Poster image is required')
        .refine((files) => files[0]?.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
        .refine((files) => {
            const file = files[0];
            if (!file) return false;
            const allowedTypes = ['image/jpeg', 'image/jpg'];
            return allowedTypes.includes(file.type);
        }, 'Only JPEG images are allowed')
});

export type EventSchema = z.infer<typeof eventSchema>;
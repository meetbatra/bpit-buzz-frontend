import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface FeedbackModalProps {
  trigger: React.ReactNode
  onSubmit: (rating: number, message: string) => void
}

const FeedbackModal = ({ trigger, onSubmit }: FeedbackModalProps) =>  {
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    onSubmit(rating, message)
  }

  return (
    <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="w-[22rem]">
            <DialogHeader>
            <DialogTitle>Event Feedback</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                key={star}
                size={24}
                className={`cursor-pointer {${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`}
                onClick={() => setRating(star)}
                />
            ))}
            </div>
            <Textarea
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-2"
            maxLength={200}
            minLength={10}
            />
            <p className="text-sm text-gray-500 mb-4">Max 200 characters.</p>
            <Button onClick={handleSubmit} disabled={rating === 0 || message.trim() === ""}>
            Submit
            </Button>
        </DialogContent>
    </Dialog>
  )
}

export default FeedbackModal;
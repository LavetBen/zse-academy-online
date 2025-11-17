import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const CourseReviewsTab = () => {
  const { courseId } = useParams(); // 👈 get course id from URL
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("zse_training_token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/reviews",
        {
          course_id: courseId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      alert("Review submitted!");
      setComment("");
      setRating(5);
    } catch (error) {
      console.log(error);
      alert("Error submitting review");
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <FontAwesomeIcon
              icon={faStar}
              className="h-5 w-5 mr-2 text-primary"
            />
            Student Reviews
          </h2>

          {/* Add Review Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Review</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add a Review</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Rating Input */}
                <div>
                  <label className="text-sm font-medium">Rating</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="text-sm font-medium">Comment</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review..."
                  />
                </div>

                <Button className="w-full" onClick={handleSubmit}>
                  Submit Review
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews – You can plug your list rendering here */}
      </CardContent>
    </Card>
  );
};

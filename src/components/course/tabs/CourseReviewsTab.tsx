import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  courseId: string;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email?: string;
  };
}

// Helper: get initials and color for avatars
const getUserAvatarInfo = (name: string) => {
  const initials = name
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-red-500",
  ];
  const colorIndex = name.length % colors.length;
  return { initials, color: colors[colorIndex] };
};

// Star rating display
const StarRating = ({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`${sizeClasses[size]} ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm font-medium text-gray-600 ml-1">{rating}.0</span>
    </div>
  );
};

// User avatar
const UserAvatar = ({ name, className = "" }: { name: string; className?: string }) => {
  const { initials, color } = getUserAvatarInfo(name);
  return (
    <div
      className={`flex items-center justify-center rounded-full ${color} text-white font-semibold ${className}`}
    >
      {initials}
    </div>
  );
};

export const CourseReviewsTab = ({ courseId }: Props) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("zse_training_token");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/courses/${courseId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) fetchReviews();
  }, [courseId]);

  const handleSubmit = async () => {
    if (!comment.trim()) return alert("Please write a comment before submitting.");
    if (!token) return alert("You must be logged in to submit a review.");

    try {
      setSubmitting(true);
      await axios.post(
        "http://127.0.0.1:8000/api/reviews",
        { course_id: Number(courseId), rating, comment },
        { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
      );

      alert("Review submitted successfully!");
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (error: any) {
      console.error(error);
      if (!error.response) return alert("Network error.");
      if (error.response.status === 422) {
        const errors = error.response.data.errors;
        let msg = "Validation Errors:\n";
        for (const key in errors) msg += `• ${errors[key][0]}\n`;
        alert(msg);
        return;
      }
      if (error.response.status === 401) return alert("Session expired.");
      if (error.response.status === 403) alert(error.response.data.message);
      else alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Add Review Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base">
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl font-semibold">Add Your Review</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Input
                      id="rating"
                      type="number"
                      min={1}
                      max={5}
                      value={rating}
                      onChange={(e) =>
                        setRating(Math.max(1, Math.min(5, Number(e.target.value))))
                      }
                      className="w-16 sm:w-20"
                    />
                    <StarRating rating={rating} size="md" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Your Review</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience..."
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border">
                  <CardContent className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                    <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-24 sm:w-32" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : reviews.length === 0
            ? (
              <Card className="border-dashed border-2">
                <CardContent className="p-6 text-center">
                  <FontAwesomeIcon icon={faStar} className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                  <p className="text-sm text-gray-600 mb-3">Be the first to share your experience!</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="text-sm sm:text-base">Write First Review</Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            )
            : reviews.map((review) => (
                <Card
                  key={review.id}
                  className="border hover:shadow-sm transition-shadow"
                >
                  <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <UserAvatar
                      name={review.user.name}
                      className="h-10 w-10 sm:h-12 sm:w-12 text-base sm:text-lg shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-1 sm:mb-2 gap-1 sm:gap-2 items-start sm:items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">
                            {review.user.name}
                          </span>
                          <Badge variant="outline" className="text-xs">Student</Badge>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-1">
                        {review.comment}
                      </p>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const mockReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "2 weeks ago",
    comment: "Excellent course! The content is well-structured and easy to follow.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    date: "1 month ago",
    comment: "Great course with practical examples. Would recommend!",
  },
];

export const CourseReviewsTab = () => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center text-left">
              <FontAwesomeIcon icon={faStar} className="h-5 w-5 mr-2 text-primary" />
              Student Reviews
            </h2>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold mr-2">4.7</span>
              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`h-5 w-5 ${
                        i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Course Rating • 2,850 reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm w-12">{stars} stars</span>
              <Progress value={stars === 5 ? 75 : stars === 4 ? 20 : 5} className="flex-1" />
              <span className="text-sm text-muted-foreground w-12 text-right">
                {stars === 5 ? "75%" : stars === 4 ? "20%" : "5%"}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-6 mt-8">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{review.name}</h4>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

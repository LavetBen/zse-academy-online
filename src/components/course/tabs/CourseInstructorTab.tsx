import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CourseInstructorTabProps {
  instructor?: {
    id: number;
    name: string;
  };
}

export const CourseInstructorTab = ({ instructor }: CourseInstructorTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt={instructor?.name || "Instructor"} />
            <AvatarFallback>
              {instructor?.name
                .split(" ")
                .map((n) => n[0])
                .join("") || "IN"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-bold">{instructor?.name || "Course Instructor"}</h3>
            <p className="text-muted-foreground">Course Expert</p>
            <div className="flex items-center mt-2 space-x-4 text-sm">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"
                />
                <span>4.7 Instructor Rating</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-muted-foreground mr-1" />
                <span>12,453 Students</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4 text-muted-foreground mr-1" />
                <span>Multiple Courses</span>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                Experienced instructor with deep knowledge in this field. Passionate about sharing
                knowledge and helping students achieve their learning goals.
              </p>
              <p>
                Dedicated to providing high-quality educational content and practical learning
                experiences.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

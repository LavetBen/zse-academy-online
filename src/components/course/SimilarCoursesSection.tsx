import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Course } from "@/services/course.service";

interface SimilarCoursesSectionProps {
  courses: Course[];
}

export const SimilarCoursesSection = ({ courses }: SimilarCoursesSectionProps) => {
  if (!courses || courses.length === 0) {
    return null;
  }

  const formatPrice = (price: string | number): string => {
    return `$${parseFloat(price.toString()).toFixed(2)}`;
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-left">Similar Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} to={`/courses/${course.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video relative">
                <img
                  src={course.thumbnail_url || course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {formatPrice(course.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {course.level}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

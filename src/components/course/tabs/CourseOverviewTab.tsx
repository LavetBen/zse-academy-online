import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faAward } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";

interface CourseOverviewTabProps {
  totalLessons: number;
  modulesCount: number;
}

export const CourseOverviewTab = ({ totalLessons, modulesCount }: CourseOverviewTabProps) => {
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold flex items-center text-left mb-4">
            <FontAwesomeIcon icon={faListAlt} className="h-5 w-5 mr-2 text-primary" />
            What You'll Learn
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
            <li>Master key concepts and practical skills</li>
            <li>Learn from industry experts with years of experience</li>
            <li>Hands-on projects and real-world applications</li>
            <li>Build a strong foundation in the subject matter</li>
            <li>Certificate of completion to showcase your achievement</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold flex items-center text-left mb-4">
            <FontAwesomeIcon icon={faAward} className="h-5 w-5 mr-2 text-primary" />
            Course Requirements
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
            <li>Basic understanding of the subject (helpful but not required)</li>
            <li>Access to a computer with internet connection</li>
            <li>Interest in learning and applying new concepts</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{totalLessons}+</div>
          <div className="text-sm text-muted-foreground">Lessons</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{modulesCount}</div>
          <div className="text-sm text-muted-foreground">Modules</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">12.4K+</div>
          <div className="text-sm text-muted-foreground">Students</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">100%</div>
          <div className="text-sm text-muted-foreground">Practical</div>
        </Card>
      </div>
    </>
  );
};

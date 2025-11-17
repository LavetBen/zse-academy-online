import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faAward, faBook, faVideo, faUsers, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";

interface CourseOverviewTabProps {
  totalLessons: number;
  modulesCount: number;
}

export const CourseOverviewTab = ({ totalLessons, modulesCount }: CourseOverviewTabProps) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="text-center p-3 sm:p-4 border-l-4 border-l-primary">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <FontAwesomeIcon icon={faBook} className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div>
              <div className="text-lg sm:text-xl font-bold text-primary">{totalLessons}+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Lessons</div>
            </div>
          </div>
        </Card>
        
        <Card className="text-center p-3 sm:p-4 border-l-4 border-l-primary">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <FontAwesomeIcon icon={faListAlt} className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div>
              <div className="text-lg sm:text-xl font-bold text-primary">{modulesCount}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Modules</div>
            </div>
          </div>
        </Card>
        
        <Card className="text-center p-3 sm:p-4 border-l-4 border-l-primary">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <FontAwesomeIcon icon={faUsers} className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div>
              <div className="text-lg sm:text-xl font-bold text-primary">12.4K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Students</div>
            </div>
          </div>
        </Card>
        
        <Card className="text-center p-3 sm:p-4 border-l-4 border-l-primary">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <FontAwesomeIcon icon={faChartLine} className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div>
              <div className="text-lg sm:text-xl font-bold text-primary">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Practical</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="h-full">
          <CardContent className="p-4 sm:p-6 h-full">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faListAlt} className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-left">What You'll Learn</h2>
              </div>
            </div>
            <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
              <li>Master key concepts and practical skills</li>
              <li>Learn from industry experts with years of experience</li>
              <li>Hands-on projects and real-world applications</li>
              <li>Build a strong foundation in the subject matter</li>
              <li>Certificate of completion to showcase your achievement</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardContent className="p-4 sm:p-6 h-full">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faAward} className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-left">Course Requirements</h2>
              </div>
            </div>
            <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
              <li>Basic understanding of the subject (helpful but not required)</li>
              <li>Access to a computer with internet connection</li>
              <li>Interest in learning and applying new concepts</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4 text-left">Course Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <FontAwesomeIcon icon={faVideo} className="h-4 w-4 text-primary" />
              <span className="text-sm">HD Video Content</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <FontAwesomeIcon icon={faAward} className="h-4 w-4 text-primary" />
              <span className="text-sm">Certificate</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-primary" />
              <span className="text-sm">Community Access</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
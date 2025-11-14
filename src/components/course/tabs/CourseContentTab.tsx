import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Slide {
  id: number;
  title: string;
  type: string;
  url: string;
  file_path: string | null;
  position: number;
}

interface Content {
  id: number;
  title: string;
  description: string;
  slides: Slide[];
}

interface CourseContentTabProps {
  contents: Content[];
  totalLessons: number;
  onContentClick: (content: Content, slide: Slide, slideIndex: number) => void;
}

export const CourseContentTab = ({
  contents,
  totalLessons,
  onContentClick,
}: CourseContentTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-left">Course Content</h2>
          <div className="text-sm text-muted-foreground">
            {contents.length} modules • {totalLessons} lessons
          </div>
        </div>

        <div className="space-y-4">
          {contents.map((content, contentIndex) => (
            <div key={content.id} className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 p-4 font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4 mr-2" />
                  <span>
                    Module {contentIndex + 1}: {content.title}
                  </span>
                </div>
                <Badge variant="outline">{content.slides.length} lessons</Badge>
              </div>

              <div className="divide-y">
                {content.slides.map((slide, slideIndex) => (
                  <button
                    key={slide.id}
                    onClick={() => onContentClick(content, slide, slideIndex)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <FontAwesomeIcon icon={faPlay} className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{slide.title}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {slide.type}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronLeft,
  faChevronRight,
  faForward,
  faBackward,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YouTubePlayer } from "./YouTubePlayer";

interface Slide {
  id: number;
  title: string;
  type: string;
  url: string;
  file_path: string | null;
  position: number;
}

interface CourseContentModalProps {
  content: {
    title: string;
    type: string;
    url: string;
    youtubeId?: string;
    currentSlideIndex: number;
    totalSlides: number;
    contentId: number;
    slides: Slide[];
  };
  onClose: () => void;
  onNavigateSlide: (index: number) => void;
  onFinish: () => void;
}

export const CourseContentModal = ({
  content,
  onClose,
  onNavigateSlide,
  onFinish,
}: CourseContentModalProps) => {
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  const isFirstSlide = content.currentSlideIndex === 0;
  const isLastSlide = content.currentSlideIndex === content.totalSlides - 1;

  const handleNavigate = (newIndex: number) => {
    setSlideDirection(newIndex > content.currentSlideIndex ? "right" : "left");
    setTimeout(() => onNavigateSlide(newIndex), 50);
  };

  const getPowerPointEmbedUrl = (url: string): string => {
    if (url.includes("drive.google.com")) {
      const fileId = url.match(/\/d\/([^\/]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const slideAnimationClass =
    slideDirection === "right" ? "animate-slide-in-right" : "animate-slide-in-left";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-6xl aspect-video relative flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-background">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
            >
              <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
            </button>
            <div>
              <h3 className="font-semibold text-lg">{content.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="text-xs capitalize">
                  {content.type}
                </Badge>
                <span>Module Content</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={content.currentSlideIndex}
              onChange={(e) => handleNavigate(parseInt(e.target.value))}
              className="text-sm border rounded px-2 py-1 bg-background"
            >
              {content.slides.map((slide, index) => (
                <option key={index} value={index}>
                  Slide {index + 1}: {slide.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 relative bg-muted">
          <div className={`w-full h-full ${slideAnimationClass}`}>
            {content.type === "video" ? (
              <YouTubePlayer content={content} />
            ) : content.type === "ppt" ? (
              <iframe
                src={getPowerPointEmbedUrl(content.url)}
                className="w-full h-full"
                title={content.title}
              />
            ) : null}
          </div>
        </div>

        <div className="bg-background border-t p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(content.currentSlideIndex - 1)}
                disabled={isFirstSlide}
                className="h-8"
              >
                <FontAwesomeIcon icon={faBackward} className="h-3 w-3 mr-1" />
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                {content.currentSlideIndex + 1} / {content.totalSlides}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(content.currentSlideIndex + 1)}
                disabled={isLastSlide}
                className="h-8 w-8 p-0"
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
              </Button>

              {isLastSlide ? (
                <Button onClick={onFinish} size="sm" className="h-8 bg-green-600 hover:bg-green-700">
                  <FontAwesomeIcon icon={faCheck} className="h-3 w-3 mr-1" />
                  Finish
                </Button>
              ) : (
                <Button
                  onClick={() => handleNavigate(content.currentSlideIndex + 1)}
                  size="sm"
                  className="h-8"
                  disabled={isLastSlide}
                >
                  <FontAwesomeIcon icon={faForward} className="h-3 w-3 mr-1" />
                  Next
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {content.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === content.currentSlideIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                title={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

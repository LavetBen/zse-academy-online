import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlayCircle, faFileAlt, faLock } from "@fortawesome/free-solid-svg-icons";

interface Slide {
  id: number;
  title: string;
  type: string;
  url: string;
  file_path: string | null;
  position: number;
  is_locked?: boolean;
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
  isEnrolled?: boolean;
}

export const CourseContentTab = ({
  contents,
  totalLessons,
  onContentClick,
  isEnrolled,
}: CourseContentTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Course content</h2>
        <div className="text-sm text-gray-600">
          {contents?.length || 0} sections • {totalLessons} lectures
        </div>
      </div>

      <div className="border border-gray-200">
        {contents?.map((content, contentIndex) => (
          <div key={content.id} className="border-b last:border-b-0 border-gray-200">
            {/* Section Header */}
            <div className="bg-[#f7f9fa] p-4 flex items-center justify-between border-b border-gray-200 last:border-b-0">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 text-gray-900" />
                <span className="font-bold text-gray-900">
                  Section {contentIndex + 1}: {content.title}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {content.slides?.length || 0} lectures
              </div>
            </div>

            {/* Lecture list */}
            <div className="bg-white">
              {content.slides?.map((slide, slideIndex) => {
                const isLocked = slide.is_locked && !isEnrolled;
                return (
                  <button
                    key={slide.id}
                    onClick={() => onContentClick(content, slide, slideIndex)}
                    className="w-full flex items-center justify-between px-6 py-3 hover:bg-[#f7f9fa] transition-colors group border-b last:border-b-0 border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <FontAwesomeIcon
                        icon={isLocked ? faLock : (slide.type === "video" ? faPlayCircle : faFileAlt)}
                        className={`h-3.5 w-3.5 ${isLocked ? "text-amber-500" : (slide.type === "video" ? "text-gray-900" : "text-gray-500")}`}
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-sm text-gray-700 group-hover:underline">{slide.title}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{slide.type}</span>
                      </div>
                    </div>
                    {isLocked ? (
                      <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        🔒 Locked
                      </div>
                    ) : (
                      slide.type === "video" && (
                        <div className="text-xs text-[#00aeef] font-bold group-hover:underline">Preview</div>
                      )
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

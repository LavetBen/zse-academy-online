import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faClock,
  faArrowTrendUp,
  faDownload,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface CourseSidebarCardProps {
  thumbnailUrl: string;
  title: string;
  price?: string | number;
  isEnrolled: boolean;
  totalLessons: number;
  modulesCount: number;
  hasSampleVideos: boolean;
  courseId?: string | number;
  onPreviewClick?: () => void;
  onEnrollClick?: () => void;
  onWishlistClick?: () => void;
}

export const CourseSidebarCard = ({
  thumbnailUrl,
  title,
  price = 0,
  isEnrolled,
  totalLessons,
  modulesCount,
  hasSampleVideos,
  courseId,
  onPreviewClick,
  onEnrollClick,
  onWishlistClick,
}: CourseSidebarCardProps) => {

  return (
    <Card className="sticky top-10 w-[340px] shadow-2xl border border-gray-200 rounded-none bg-white z-50">
      <div className="relative aspect-video overflow-hidden group cursor-pointer" onClick={onPreviewClick}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center">
            <FontAwesomeIcon icon={faPlay} className="h-5 w-5 text-black ml-1" />
          </div>
        </div>
        {!isEnrolled && hasSampleVideos && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-sm drop-shadow-md">
            Preview this course
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="text-3xl font-bold text-gray-900">${parseFloat(price.toString()).toFixed(2)}</div>
            <div className="flex items-center gap-2 text-sm text-red-600 font-bold">
              <span>85% off</span>
              <span className="line-through text-gray-400 font-normal mt-0.5">${(parseFloat(price.toString()) * 6.5).toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            {isEnrolled ? (
              <Button asChild className="w-full h-12 bg-black hover:bg-gray-800 text-white font-bold rounded-none text-base">
                <Link to={`/learn/${courseId}`}>Go to course</Link>
              </Button>
            ) : (
              <Button className="w-full h-12 bg-[#00aeef] hover:bg-[#009ad1] text-white font-bold rounded-none text-base" onClick={onEnrollClick}>
                Enroll Now
              </Button>
            )}

            <div className="text-center text-xs text-gray-500 py-2">
              30-Day Money-Back Guarantee
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full rounded-none border-black text-black font-bold h-10 hover:bg-gray-50"
                onClick={onWishlistClick}
              >
                Wishlist
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-none border-black text-black font-bold h-10 hover:bg-gray-50"
              >
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold text-sm text-gray-900 mb-4">This course includes:</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-700">
              <FontAwesomeIcon
                icon={faClock}
                className="h-3.5 w-3.5 mr-4 text-gray-800"
              />
              <span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="h-3.5 w-3.5 mr-4 text-gray-800"
              />
              <span>{modulesCount} modules</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FontAwesomeIcon
                icon={faDownload}
                className="h-3.5 w-3.5 mr-4 text-gray-800"
              />
              <span>Downloadable resources</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FontAwesomeIcon
                icon={faAward}
                className="h-3.5 w-3.5 mr-4 text-gray-800"
              />
              <span>Certificate of completion</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="text-sm font-bold text-gray-900 hover:text-gray-700 underline">Apply Coupon</button>
        </div>
      </CardContent>
    </Card>
  );
};

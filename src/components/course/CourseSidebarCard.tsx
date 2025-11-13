import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faClock,
  faArrowTrendUp,
  faDownload,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

interface CourseSidebarCardProps {
  thumbnailUrl: string;
  title: string;
  price: string | number;
  isEnrolled: boolean;
  totalLessons: number;
  modulesCount: number;
  hasSampleVideos: boolean;
  onPreviewClick?: () => void;
  onEnrollClick?: () => void;
  onWishlistClick?: () => void;
}

export const CourseSidebarCard = ({
  thumbnailUrl,
  title,
  price,
  isEnrolled,
  totalLessons,
  modulesCount,
  hasSampleVideos,
  onPreviewClick,
  onEnrollClick,
  onWishlistClick,
}: CourseSidebarCardProps) => {
  const formatPrice = (price: string | number): string => {
    return `$${parseFloat(price.toString()).toFixed(2)}`;
  };

  return (
    <Card className="sticky top-4 shadow-lg border-0">
      <div className="relative aspect-video rounded-t-lg overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {hasSampleVideos && (
          <>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button
                size="lg"
                className="rounded-full h-16 w-16 bg-white/90 hover:bg-white"
                onClick={onPreviewClick}
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  className="h-6 w-6 ml-1 text-black"
                />
              </Button>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
              Preview
            </div>
          </>
        )}
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-primary">
            {formatPrice(price)}
          </div>
          {isEnrolled && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Enrolled
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          {isEnrolled ? (
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Continue Learning
            </Button>
          ) : (
            <Button className="w-full" onClick={onEnrollClick}>
              Enroll Now
            </Button>
          )}
          <Button variant="outline" className="w-full" onClick={onWishlistClick}>
            Add to Wishlist
          </Button>
        </div>

        <div className="pt-4">
          <h3 className="font-bold text-left mb-2">This course includes:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faClock}
                className="h-4 w-4 mr-2 text-muted-foreground"
              />
              <span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="h-4 w-4 mr-2 text-muted-foreground"
              />
              <span>{modulesCount} modules</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faDownload}
                className="h-4 w-4 mr-2 text-muted-foreground"
              />
              <span>Downloadable resources</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faAward}
                className="h-4 w-4 mr-2 text-muted-foreground"
              />
              <span>Certificate of completion</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

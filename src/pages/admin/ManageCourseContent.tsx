import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseService } from "@/services/course.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faArrowLeft, 
  faVideo, 
  faFileAlt, 
  faBook,
  faClock,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface CourseContent {
  id: number;
  title: string;
  description: string;
  type: "video" | "document" | "lesson";
  url?: string;
  duration?: string;
  position: number;
  created_at?: string;
  updated_at?: string;
}

const ManageCourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [contents, setContents] = useState<CourseContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<CourseContent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "lesson" as "video" | "document" | "lesson",
    url: "",
    duration: "",
    position: 0,
  });

  useEffect(() => {
    if (courseId) {
      fetchContents();
    }
  }, [courseId]);

  const fetchContents = async () => {
    try {
      const data = await courseService.getCourseContent(courseId!);
      // Sort contents by position
      const sortedContents = (data.data || data).sort((a: CourseContent, b: CourseContent) => 
        a.position - b.position
      );
      setContents(sortedContents);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch course content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare data according to backend validation
      const contentData = {
        title: formData.title,
        description: formData.description || null,
        type: formData.type,
        url: formData.url || null,
        duration: formData.duration || null,
        position: formData.position,
      };

      if (editingContent) {
        await courseService.updateCourseContent(courseId!, editingContent.id, contentData);
        toast({ 
          title: "Success", 
          description: "Content updated successfully",
          className: "bg-green-50 text-green-900 border-green-200"
        });
      } else {
        await courseService.createCourseContent(courseId!, contentData);
        toast({ 
          title: "Success", 
          description: "Content created successfully",
          className: "bg-green-50 text-green-900 border-green-200"
        });
      }
      fetchContents();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save content",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (contentId: number) => {
    if (!confirm("Are you sure you want to delete this content? This action cannot be undone.")) return;
    try {
      await courseService.deleteCourseContent(courseId!, contentId);
      toast({ 
        title: "Success", 
        description: "Content deleted successfully",
        className: "bg-green-50 text-green-900 border-green-200"
      });
      fetchContents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    // Set default position to next available position
    const nextPosition = contents.length > 0 ? Math.max(...contents.map(c => c.position)) + 1 : 0;
    
    setFormData({ 
      title: "", 
      description: "", 
      type: "lesson", 
      url: "", 
      duration: "", 
      position: nextPosition 
    });
    setEditingContent(null);
  };

  const openEditDialog = (content: CourseContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      description: content.description || "",
      type: content.type,
      url: content.url || "",
      duration: content.duration || "",
      position: content.position,
    });
    setIsDialogOpen(true);
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return faVideo;
      case "document":
        return faFileAlt;
      default:
        return faBook;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "document":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "video":
        return "from-blue-50 to-blue-25";
      case "document":
        return "from-emerald-50 to-emerald-25";
      default:
        return "from-purple-50 to-purple-25";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg animate-pulse border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="flex gap-4">
                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                        <div className="h-5 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-9 w-9 bg-gray-200 rounded"></div>
                      <div className="h-9 w-9 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="text-muted-foreground hover:text-foreground transition-colors group"
        >
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" 
          />
          Back
        </Button>
      </div>

      {/* Main Content Card */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">Course Content</CardTitle>
            <p className="text-muted-foreground mt-1">
              Manage lessons, videos, and documents for your course
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary hover:bg-primary/90">
                <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {editingContent ? "Edit Content" : "Add New Content"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="Enter content title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter content description"
                      rows={3}
                      className="mt-1 resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type" className="text-sm font-medium">Content Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: "video" | "document" | "lesson") =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lesson">Lesson</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="position" className="text-sm font-medium">Display Order</Label>
                      <Input
                        id="position"
                        type="number"
                        min="0"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) || 0 })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="url" className="text-sm font-medium">
                      <FontAwesomeIcon icon={faLink} className="mr-2 h-3 w-3" />
                      Resource URL
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://example.com/resource"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration" className="text-sm font-medium">
                      <FontAwesomeIcon icon={faClock} className="mr-2 h-3 w-3" />
                      Duration
                    </Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 30 minutes, 1 hour"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="min-w-24"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="min-w-24 bg-primary hover:bg-primary/90"
                  >
                    {editingContent ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {contents.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
                <FontAwesomeIcon icon={faBook} className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <h3 className="text-xl font-semibold mb-2">No content yet</h3>
                <p className="mb-6">Start building your course by adding the first piece of content</p>
                <Button onClick={resetForm} className="bg-primary hover:bg-primary/90">
                  <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
                  Add Your First Content
                </Button>
              </div>
            ) : (
              contents.map((content) => (
                <Card 
                  key={content.id} 
                  className={`border-l-4 border-l-primary bg-gradient-to-r ${getTypeGradient(content.type)} hover:shadow-md transition-all duration-200`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 flex items-start gap-4">
                        <div className={`p-3 rounded-lg border ${getTypeColor(content.type)}`}>
                          <FontAwesomeIcon icon={getContentIcon(content.type)} className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-foreground mb-1">
                                {content.title}
                              </h3>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className={getTypeColor(content.type)}>
                                  {content.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs font-normal">
                                  Order: {content.position}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          {content.description && (
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                              {content.description}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            {content.duration && (
                              <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                                <span>{content.duration}</span>
                              </div>
                            )}
                            {content.url && (
                              <a 
                                href={content.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:text-primary/80 hover:underline transition-colors"
                              >
                                <FontAwesomeIcon icon={faLink} className="h-3 w-3" />
                                <span>View Resource</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => openEditDialog(content)}
                          className="h-9 w-9 p-0"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleDelete(content.id)}
                          className="h-9 w-9 p-0"
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCourseContent;
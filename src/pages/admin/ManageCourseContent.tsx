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
  faBook 
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

interface CourseContent {
  id: number;
  title: string;
  description: string;
  type: "video" | "document" | "lesson";
  url?: string;
  duration?: string;
  order: number;
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
    order: 1,
  });

  useEffect(() => {
    if (courseId) {
      fetchContents();
    }
  }, [courseId]);

  const fetchContents = async () => {
    try {
      const data = await courseService.getCourseContent(courseId!);
      setContents(data.data || data);
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
      if (editingContent) {
        await courseService.updateCourseContent(courseId!, editingContent.id, formData);
        toast({ title: "Success", description: "Content updated successfully" });
      } else {
        await courseService.createCourseContent(courseId!, formData);
        toast({ title: "Success", description: "Content created successfully" });
      }
      fetchContents();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (contentId: number) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    try {
      await courseService.deleteCourseContent(courseId!, contentId);
      toast({ title: "Success", description: "Content deleted successfully" });
      fetchContents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", type: "lesson", url: "", duration: "", order: 1 });
    setEditingContent(null);
  };

  const openEditDialog = (content: CourseContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      description: content.description,
      type: content.type,
      url: content.url || "",
      duration: content.duration || "",
      order: content.order,
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

  if (loading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/admin")}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-card via-card to-muted/30 border-border/50 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Course Content</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingContent ? "Edit Content" : "Add New Content"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "video" | "document" | "lesson") =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lesson">Lesson</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Order</Label>
                    <Input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>URL (optional)</Label>
                  <Input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Duration (optional)</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 30 minutes"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingContent ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No content added yet. Click "Add Content" to get started.
              </div>
            ) : (
              contents.map((content) => (
                <Card key={content.id} className="bg-gradient-to-br from-card to-accent/20 hover:shadow-medium transition-all">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <FontAwesomeIcon icon={getContentIcon(content.type)} className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{content.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span className="capitalize">Type: {content.type}</span>
                            <span>Order: {content.order}</span>
                            {content.duration && <span>Duration: {content.duration}</span>}
                          </div>
                          {content.url && (
                            <a 
                              href={content.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary text-sm hover:underline mt-1 inline-block"
                            >
                              View Resource →
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(content)}>
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(content.id)}>
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

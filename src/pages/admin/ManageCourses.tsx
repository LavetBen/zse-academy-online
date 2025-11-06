import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { courseService, Course } from "@/services/course.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch, faList } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ManageCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    level: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAdminCourses();
      setCourses(data.data || data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
      };
      
      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, courseData);
        toast({ title: "Success", description: "Course updated successfully" });
      } else {
        await courseService.createCourse(courseData);
        toast({ title: "Success", description: "Course created successfully" });
      }
      fetchCourses();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save course",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseService.deleteCourse(id);
      toast({ title: "Success", description: "Course deleted successfully" });
      fetchCourses();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", price: "", duration: "", level: "" });
    setEditingCourse(null);
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      duration: course.duration,
      level: course.level,
    });
    setIsDialogOpen(true);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Loading courses...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-card via-card to-muted/30 border-border/50 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Courses</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
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
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 8 weeks"
                      required
                    />
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Input
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      placeholder="Beginner/Intermediate/Advanced"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingCourse ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-gradient-to-br from-card to-accent/20 hover:shadow-medium transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Price: ${course.price}</span>
                        <span>Duration: {course.duration}</span>
                        <span>Level: {course.level}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => navigate(`/admin/courses/${course.id}/content`)}
                        title="Manage Content"
                      >
                        <FontAwesomeIcon icon={faList} className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(course)}>
                        <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(course.id)}>
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCourses;

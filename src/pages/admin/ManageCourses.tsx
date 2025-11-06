import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { courseService, Course } from "@/services/course.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faList,
  faImage,
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

interface Category {
  id: number;
  name: string;
}

// Skeleton Loader Component
const CourseSkeleton = () => {
  return (
    <Card className="bg-gradient-to-br from-card to-accent/20">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="flex flex-wrap gap-4">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-9 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-9 w-9 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-9 w-9 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ManageCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    level: "",
    thumbnail_url: "",
    duration: "",
    is_published: false,
  });

  useEffect(() => {
    fetchCourses();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const mockCategories: Category[] = [
        { id: 1, name: "Portfolio Management" },
        { id: 2, name: "Risk Management" },
        { id: 3, name: "Market Analysis" },
        { id: 4, name: "Compliance" },
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const courseData: any = {
        title: formData.title,
        description: formData.description,
        level: formData.level,
        price: formData.price ? parseFloat(formData.price) : 0,
        thumbnail_url: formData.thumbnail_url || null,
        duration: formData.duration,
        is_published: formData.is_published,
      };

      // Only include category if it's not empty
      if (formData.category) {
        courseData.category = formData.category;
      }

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
    } catch (error: any) {
      console.error("Error saving course:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to save course",
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
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      level: "",
      thumbnail_url: "",
      duration: "",
      is_published: false,
    });
    setEditingCourse(null);
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || "",
      description: course.description || "",
      price: course.price?.toString() || "",
      category: typeof course.category === 'object' ? course.category.name : (course.category || ""),
      level: course.level || "",
      thumbnail_url: course.thumbnail_url || "",
      duration: course.duration || "",
      is_published: course.is_published || false,
    });
    setIsDialogOpen(true);
  };

  const handleCategoryChange = (value: string) => {
    const selectedCategory = categories.find(
      (cat) => cat.id.toString() === value
    );
    setFormData({
      ...formData,
      category: selectedCategory ? selectedCategory.name : "",
    });
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show skeleton loader while loading
  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-card via-card to-muted/30 border-border/50 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <CourseSkeleton key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      placeholder="Enter course title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter course description"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger className="bg-gray-50 dark:bg-gray-800">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800">
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="level">Level</Label>
                      <Select
                        value={formData.level}
                        onValueChange={(value) =>
                          setFormData({ ...formData, level: value })
                        }
                      >
                        <SelectTrigger className="bg-gray-50 dark:bg-gray-800">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800">
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Professional">
                            Professional
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        placeholder="e.g., 8 weeks"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="thumbnail_url">
                      <FontAwesomeIcon
                        icon={faImage}
                        className="mr-2 h-4 w-4"
                      />
                      Thumbnail URL
                    </Label>
                    <Input
                      id="thumbnail_url"
                      type="url"
                      value={formData.thumbnail_url}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          thumbnail_url: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_published: checked })
                      }
                    />
                    <Label htmlFor="is_published">Publish course</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCourse ? "Update Course" : "Create Course"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
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
              <Card
                key={course.id}
                className="bg-gradient-to-br from-card to-accent/20 hover:shadow-medium transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          {course.title}
                        </h3>
                        {course.is_published ? (
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800"
                          >
                            Published
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-gray-500 border-gray-300"
                          >
                            Draft
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-primary font-medium">
                          ${course.price || 0}
                        </span>
                        <span>Level: {course.level || "Not set"}</span>
                        <span>
                          Category: {typeof course.category === 'object' ? course.category.name : (course.category || "Uncategorized")}
                        </span>
                        {course.duration && (
                          <span>Duration: {course.duration}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(`/admin/courses/${course.id}/content`)
                        }
                        title="Manage Content"
                      >
                        Manage Content<FontAwesomeIcon icon={faList} className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(course)}
                      >
                        <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(course.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No courses found matching your search."
                : "No courses available."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCourses;
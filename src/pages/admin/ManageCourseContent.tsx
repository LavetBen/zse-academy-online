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
  faLink,
  faUpload,
  faFilePdf,
  faFileImage,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faBars,
  faXmark,
  faChevronRight,
  faList,
  faLayerGroup
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
import logo from "@/assets/logo.png";

interface CourseResource {
  id: number;
  name: string;
  file_type: string;
  file_size: number;
  url: string;
  uploaded_at: string;
}

interface CourseContent {
  id: number;
  title: string;
  description: string;
  type: "video" | "document" | "lesson";
  url?: string;
  duration?: string;
  position: number;
  resources?: CourseResource[];
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
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "lesson" as "video" | "document" | "lesson",
    url: "",
    duration: "",
    position: 0,
  });

  const [selectedContentForResource, setSelectedContentForResource] = useState<CourseContent | null>(null);
  const [resourceFile, setResourceFile] = useState<File | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchContents();
    }
  }, [courseId]);

  const fetchContents = async () => {
    try {
      const data = await courseService.getCourseContent(courseId!);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 50 * 1024 * 1024; // 50MB
      
      if (file.size > maxSize) {
        toast({
          title: "Error",
          description: "File size must be less than 50MB",
          variant: "destructive",
        });
        return;
      }
      
      setResourceFile(file);
    }
  };

  const openResourceDialog = (content: CourseContent) => {
    setSelectedContentForResource(content);
    setResourceFile(null);
    setIsResourceDialogOpen(true);
  };

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resourceFile || !selectedContentForResource) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploadingFile(true);
    
    try {
      // In production, upload to Lovable Cloud Storage
      const newResource: CourseResource = {
        id: Date.now(),
        name: resourceFile.name,
        file_type: resourceFile.type,
        file_size: resourceFile.size,
        url: URL.createObjectURL(resourceFile),
        uploaded_at: new Date().toISOString(),
      };

      // Update the content with the new resource
      const updatedResources = [...(selectedContentForResource.resources || []), newResource];
      const updatedContent = { ...selectedContentForResource, resources: updatedResources };
      
      // Here you would call an API to update the content with the new resource
      // For now, we'll simulate it locally
      setContents(contents.map(c => 
        c.id === selectedContentForResource.id ? updatedContent : c
      ));
      
      toast({ 
        title: "Success", 
        description: "Resource attached successfully",
        className: "bg-green-50 text-green-900 border-green-200"
      });
      
      setIsResourceDialogOpen(false);
      setResourceFile(null);
      setSelectedContentForResource(null);
    } catch (error: any) {
      console.error("Error uploading resource:", error);
      toast({
        title: "Error",
        description: "Failed to attach resource",
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDeleteResource = (contentId: number, resourceId: number) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    
    try {
      setContents(contents.map(content => {
        if (content.id === contentId) {
          return {
            ...content,
            resources: content.resources?.filter(r => r.id !== resourceId) || []
          };
        }
        return content;
      }));
      
      toast({ 
        title: "Success", 
        description: "Resource deleted successfully",
        className: "bg-green-50 text-green-900 border-green-200"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      });
    }
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

  const getFileIcon = (fileName?: string) => {
    if (!fileName) return faFileAlt;
    
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return faFilePdf;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'webp':
        return faFileImage;
      case 'doc':
      case 'docx':
        return faFileWord;
      case 'xls':
      case 'xlsx':
        return faFileExcel;
      case 'ppt':
      case 'pptx':
        return faFilePowerpoint;
      default:
        return faFileAlt;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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

  const sidebarItems = [
    { icon: faList, label: "Content List", key: "list" },
    { icon: faLayerGroup, label: "Resources", key: "resources" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse p-6">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-border px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="p-2">
              <FontAwesomeIcon icon={mobileSidebarOpen ? faXmark : faBars} className="h-5 w-5" />
            </Button>
            <img src={logo} alt="ZSE Logo" className="h-10 w-10 object-contain" />
            <span className="font-bold text-lg">Course Content</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-border z-40 transition-all duration-300
        ${sidebarCollapsed ? "w-16" : "w-64"}
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="hidden lg:flex items-center space-x-3 mb-8">
            <img src={logo} alt="ZSE Logo" className={`object-contain transition-all ${sidebarCollapsed ? "h-12 w-12" : "h-14 w-14"}`} />
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-secondary">Course Content</span>
                <span className="text-xs text-muted-foreground">Management</span>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="ZSE Logo" className="h-12 w-12" />
              <span className="font-bold">Content</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setMobileSidebarOpen(false)}>
              <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2 flex-1">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
              {(!sidebarCollapsed || mobileSidebarOpen) && <span>Back to Courses</span>}
            </Button>
            
            <div className="pt-4 border-t mt-4">
              <p className="text-xs text-muted-foreground px-3 mb-2">
                {!sidebarCollapsed && "CONTENT SECTIONS"}
              </p>
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                  {(!sidebarCollapsed || mobileSidebarOpen) && <span>{item.label}</span>}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        {/* Desktop Header */}
        <header className="hidden lg:block bg-white border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                <FontAwesomeIcon icon={faChevronRight} className={`h-4 w-4 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-secondary">Course Content Management</h1>
                <p className="text-muted-foreground">Manage lessons, videos, and resources</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-6 bg-gradient-to-br from-muted/30 via-background to-accent/20 min-h-screen">
          <div className="space-y-6">
            {/* Main Content Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-2xl font-bold">Course Content</CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Manage lessons, videos, and documents for your course
                  </p>
                </div>
                <div className="flex gap-2">
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
                </div>
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
                                      {content.resources && content.resources.length > 0 && (
                                        <Badge variant="outline" className="text-xs font-normal bg-amber-50 text-amber-700 border-amber-200">
                                          {content.resources.length} {content.resources.length === 1 ? 'Resource' : 'Resources'}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                {content.description && (
                                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {content.description}
                                  </p>
                                )}
                                
                                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
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

                                {/* Attached Resources */}
                                {content.resources && content.resources.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-border/50">
                                    <p className="text-xs font-medium text-muted-foreground mb-2">Attached Resources</p>
                                    <div className="space-y-2">
                                      {content.resources.map((resource) => (
                                        <div key={resource.id} className="flex items-center justify-between p-2 bg-amber-50/50 rounded border border-amber-200/50">
                                          <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <FontAwesomeIcon 
                                              icon={getFileIcon(resource.name)} 
                                              className="h-4 w-4 text-amber-600 flex-shrink-0" 
                                            />
                                            <div className="flex-1 min-w-0">
                                              <p className="text-sm font-medium text-foreground truncate">{resource.name}</p>
                                              <p className="text-xs text-muted-foreground">{formatFileSize(resource.file_size)}</p>
                                            </div>
                                          </div>
                                          <div className="flex gap-1 ml-2">
                                            <a
                                              href={resource.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-1.5 hover:bg-amber-100 rounded text-amber-700"
                                              title="Download"
                                            >
                                              <FontAwesomeIcon icon={faLink} className="h-3.5 w-3.5" />
                                            </a>
                                            <button
                                              onClick={() => handleDeleteResource(content.id, resource.id)}
                                              className="p-1.5 hover:bg-red-100 rounded text-red-600"
                                              title="Delete"
                                            >
                                              <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Add Resource Button */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openResourceDialog(content)}
                                  className="mt-3 border-amber-200 text-amber-700 hover:bg-amber-50"
                                >
                                  <FontAwesomeIcon icon={faUpload} className="mr-2 h-3 w-3" />
                                  Add Resource
                                </Button>
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
        </main>
      </div>

      {/* Resource Upload Modal */}
      <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Attach Resource</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Upload a file to attach to "{selectedContentForResource?.title}"
            </p>
          </DialogHeader>
          <form onSubmit={handleResourceSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file-upload" className="text-sm font-medium">Select File *</Label>
              <div className="mt-2">
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FontAwesomeIcon icon={faUpload} className="h-10 w-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, Images, PPT, Excel, Word (MAX. 50MB)
                      </p>
                      {resourceFile && (
                        <div className="mt-3 p-2 bg-primary/10 rounded">
                          <p className="text-sm font-medium text-primary flex items-center gap-2">
                            <FontAwesomeIcon icon={getFileIcon(resourceFile.name)} className="h-4 w-4" />
                            {resourceFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(resourceFile.size)}</p>
                        </div>
                      )}
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsResourceDialogOpen(false);
                  setResourceFile(null);
                  setSelectedContentForResource(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={uploadingFile || !resourceFile}
              >
                {uploadingFile ? "Uploading..." : "Attach Resource"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCourseContent;

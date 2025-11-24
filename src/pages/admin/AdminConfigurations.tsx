import { useEffect, useState } from "react";
import { apiClient } from "@/services/api";
import { API_ENDPOINTS } from "@/constants/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Category {
  id: number;
  name: string;
}

function AdminConfigurations() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CATEGORIES);
      setCategories(response.data.data || response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const response = await apiClient.post(API_ENDPOINTS.CATEGORIES, {
        name: newCategory,
      });

      setCategories((prev) => [...prev, response.data]);
      setNewCategory("");

      toast({
        title: "Success",
        description: "Category created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await apiClient.delete(`${API_ENDPOINTS.CATEGORIES}/${categoryId}`);

      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));

      toast({
        title: "Deleted",
        description: "Category removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Admin Configurations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Configurations</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ------------------ Add Category Section ------------------ */}
        <div>
          <h3 className="font-semibold mb-2">Add New Course Category</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Category name..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleAddCategory}>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* ------------------ Search ------------------ */}
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* ------------------ Categories List ------------------ */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{category.id}</Badge>
                  <span className="font-semibold">{category.name}</span>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-1" />
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No categories found
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminConfigurations;

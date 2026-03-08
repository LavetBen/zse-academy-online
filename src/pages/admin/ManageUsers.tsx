import { useState, useEffect } from "react";
import { apiClient } from "@/services/api";
import { API_ENDPOINTS } from "@/constants/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faBook } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Enrollment {
  user_id: number;
  user_name: string;
  user_email: string;
  course_id: number;
  course_title: string;
  course_description: string;
  category_id?: number | null;
  category_name?: string | null;
  progress: number;
  status: string;
  enrolled_at: string;
}

const ManageEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_ENROLLMENTS);
      setEnrollments(response.data.data || response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch enrollments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter(
    (enroll) =>
      enroll.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enroll.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enroll.course_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manage Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search enrollments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredEnrollments.map((enroll) => (
            <Card key={`${enroll.user_id}-${enroll.course_id}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{enroll.user_name}</h3>
                      <p className="text-sm text-muted-foreground">{enroll.user_email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FontAwesomeIcon icon={faBook} className="text-muted-foreground" />
                        <span className="text-sm">{enroll.course_title}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={enroll.status === "active" ? "default" : "secondary"}>
                      {enroll.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Progress: {enroll.progress}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Enrolled: {new Date(enroll.enrolled_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEnrollments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No enrollments found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageEnrollments;

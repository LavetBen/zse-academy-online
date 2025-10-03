import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faDownload, faShareNodes, faCalendar } from "@fortawesome/free-solid-svg-icons";

const mockCertificates = [
  {
    id: 1,
    title: "Stock Market Fundamentals",
    issueDate: "2024-01-15",
    instructor: "Dr. Sarah Johnson",
    certificateId: "ZSE-SMF-2024-001",
    status: "Completed"
  },
  {
    id: 2,
    title: "Risk Management Essentials",
    issueDate: "2024-02-28",
    instructor: "Michael Chen",
    certificateId: "ZSE-RME-2024-002", 
    status: "Completed"
  },
  {
    id: 3,
    title: "Technical Analysis Basics",
    issueDate: "In Progress",
    instructor: "Emma Rodriguez",
    certificateId: "Pending",
    status: "In Progress"
  }
];

const Certificates = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certificates</h1>
          <p className="text-muted-foreground">Your achievements and certifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faAward} className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">
            {mockCertificates.filter(cert => cert.status === "Completed").length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCertificates.map((certificate) => (
          <Card key={certificate.id} className="relative">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faAward} className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">{certificate.title}</CardTitle>
              <CardDescription>Instructor: {certificate.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={certificate.status === "Completed" ? "default" : "secondary"}>
                    {certificate.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Issue Date</span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 mr-1" />
                    {certificate.issueDate}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Certificate ID</span>
                  <span className="font-mono text-xs">{certificate.certificateId}</span>
                </div>
              </div>

              {certificate.status === "Completed" && (
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FontAwesomeIcon icon={faDownload} className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <FontAwesomeIcon icon={faShareNodes} className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
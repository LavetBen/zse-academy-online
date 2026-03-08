import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import logo from "@/assets/logo.png";
import { sidebarItems, configSubItems, quizSubItems } from "./AdminSidebar";

interface AdminHeaderProps {
  userName?: string;
  activeSection: string;
  activeConfigSubSection: string;
  activeQuizSubSection: string;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
}

export const AdminHeader = ({
  userName,
  activeSection,
  activeConfigSubSection,
  activeQuizSubSection,
  sidebarCollapsed,
  mobileSidebarOpen,
  onToggleSidebar,
  onToggleMobileSidebar,
}: AdminHeaderProps) => {
  const getPageTitle = () => {
    if (activeSection === "dashboard") return `Welcome, ${userName}!`;
    if (activeSection === "config") {
      return configSubItems.find((item) => item.key === activeConfigSubSection)?.label;
    }
    if (activeSection === "quizzes") {
      return quizSubItems.find((item) => item.key === activeQuizSubSection)?.label;
    }
    return sidebarItems.find((item) => item.key === activeSection)?.label;
  };

  const getPageSubtitle = () => {
    if (activeSection === "dashboard") return "Admin Dashboard Overview";
    if (activeSection === "config") {
      return `Manage ${configSubItems.find((item) => item.key === activeConfigSubSection)?.label.toLowerCase()}`;
    }
    if (activeSection === "quizzes") {
      return `Manage ${quizSubItems.find((item) => item.key === activeQuizSubSection)?.label.toLowerCase()}`;
    }
    return `Manage ${sidebarItems.find((item) => item.key === activeSection)?.label.toLowerCase()}`;
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMobileSidebar}
              className="p-2"
            >
              <FontAwesomeIcon
                icon={mobileSidebarOpen ? faXmark : faBars}
                className="h-5 w-5 text-gray-700"
              />
            </Button>
            <img
              src={logo}
              alt="ZSE Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-lg text-gray-800">Admin</span>
          </div>
          <Badge
            variant="secondary"
            className="bg-red-100 text-red-700 text-xs font-medium"
          >
            Admin
          </Badge>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="hidden lg:flex hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`h-4 w-4 transition-transform ${
                  sidebarCollapsed ? "" : "rotate-180"
                }`}
              />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
              <p className="text-gray-600">{getPageSubtitle()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-700 font-medium"
            >
              Admin Access
            </Badge>
            <img
              src={logo}
              alt="ZSE Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
        </div>
      </header>

      {/* Mobile Page Title */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
        <p className="text-gray-600 text-sm">{getPageSubtitle()}</p>
      </div>
    </>
  );
};

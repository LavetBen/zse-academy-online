import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export const TrainingDepartments = () => {
    const departments = [
        {
            category: "Market Operations",
            items: [
                { name: "Listing and Trading Training", learners: "2,450 learners" },
                { name: "Products Training", learners: "1,820 learners" },
            ]
        },
        {
            category: "Infrastructure",
            items: [
                { name: "Market Data & Technology Training", learners: "950 learners" },
                { name: "Risk Management & Compliance", learners: "1,200 learners" },
            ]
        },
        {
            category: "Governance & Literacy",
            items: [
                { name: "Corporate Governance Training", learners: "740 learners" },
                { name: "Financial Education Training", learners: "5,600 learners" },
            ]
        }
    ];
    return (
        <section className="section-padding bg-white font-montserrat border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-[#1c1d1f] mb-8">Popular Training Pathways</h2>

                <div className="grid lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-x-12 gap-y-12">
                    {/* Left Hero Box */}
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold text-[#1c1d1f] leading-tight mb-4">
                            ZSE Academy is the hub for market expertise
                        </h3>
                        <p className="text-sm text-[#6a6f73] mb-6">
                            The ZSE offers professional Trainings under our six key specialized departments to help you master every facet of the capital markets.
                        </p>
                        <Link
                            to="/courses"
                            className="group flex items-center text-[#5624d0] font-bold text-sm hover:text-[#401b9c] transition-colors mb-2"
                        >
                            Explore all departments
                            <FontAwesomeIcon icon={faChevronRight} className="ml-2 h-3 w-3" />
                        </Link>
                        <div className="text-xs text-[#6a6f73]">12,760+ combined learners</div>

                        <div className="mt-8">
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-none border-[#1c1d1f] text-[#1c1d1f] font-bold h-12 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Link to="/courses">
                                    Show all training modules
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="h-3 w-3" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Department Columns */}
                    {departments.map((dept, idx) => (
                        <div key={idx} className="flex flex-col gap-8">
                            <h4 className="text-lg font-bold text-[#1c1d1f]">{dept.category}</h4>
                            <div className="flex flex-col gap-6">
                                {dept.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="group cursor-pointer">
                                        <Link to="/courses" className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-bold text-[#5624d0] group-hover:text-[#401b9c] underline decoration-0 group-hover:underline underline-offset-4 decoration-current transition-all">
                                                {item.name}
                                            </span>
                                            <FontAwesomeIcon icon={faChevronRight} className="h-2 w-2 text-[#5624d0] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                        <div className="text-xs text-[#6a6f73]">{item.learners}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

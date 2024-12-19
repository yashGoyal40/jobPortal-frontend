import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function JobFilters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    "workType": null,
    place: null,
    niche: null,
  });

  const jobType = ["Full-time", "Part-time"];
  const locations = [
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Pune",
    "Gurugram",
    "Noida",
    "Kolkata",
    "Ahmedabad",
    "Chandigarh",
    "Jaipur",
    "Kochi",
    "Bhubaneswar",
    "Indore",
    "Coimbatore",
    "Vadodara",
    "Surat",
    "Udaipur",
  ];

  const niches = [
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "System Administrator",
    "DevOps Engineer",
    "Site Reliability Engineer (SRE)",
    "Cloud Engineer",
    "Machine Learning Engineer",
    "Game Developer",
    "Android Developer",
    "iOS Developer",
    "Application Developer",
    "Data Scientist",
    "Data Engineer",
    "Big Data Engineer",
    "AI Engineer",
    "Blockchain Developer",
    "Cybersecurity Specialist",
    "QA Engineer",
    "Test Automation Engineer",
    "IT Support Specialist",
    "Network Engineer",
    "Database Administrator",
    "UI/UX Designer",
    "Product Manager",
    "Scrum Master",
    "Solutions Architect",
    "Technical Writer",
    "AR/VR Developer",
    "Embedded Systems Engineer",
    "IT Consultant",
  ];

  const handleFilterClick = (group, label) => {
    setSelectedFilters((prev) => {
      const isAlreadySelected = prev[group] === label;
      const updatedFilters = {
        ...prev,
        [group]: isAlreadySelected ? null : label,
      };
      if (onFilterChange && prev[group] !== updatedFilters[group]) {
        onFilterChange(group, updatedFilters[group]);
      }
      return updatedFilters;
    });
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="w-full lg:w-64 mb-6 lg:mb-0">
      <Button
        variant="outline"
        className="w-full mb-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filters{" "}
        {isOpen ? (
          <ChevronUp className="ml-2" />
        ) : (
          <ChevronDown className="ml-2" />
        )}
      </Button>
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-black p-4 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Filters
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="workType">
                <AccordionTrigger>Job Type</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {jobType.map((label) => (
                      <FilterCheckbox
                        key={label}
                        group="workType"
                        label={label}
                        selected={selectedFilters["workType"] === label}
                        handleClick={handleFilterClick}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="place">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {locations.map((label) => (
                      <FilterCheckbox
                        key={label}
                        group="location"
                        label={label}
                        selected={selectedFilters.location === label}
                        handleClick={handleFilterClick}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="niche">
                <AccordionTrigger>Niche</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {niches.map((label) => (
                      <FilterCheckbox
                        key={label}
                        group="niche"
                        label={label}
                        selected={selectedFilters.niche === label}
                        handleClick={handleFilterClick}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterCheckbox({ label, group, handleClick, selected }) {
  return (
    <div
      className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
        selected ? "bg-blue-500 text-white" : "bg-transparent"
      }`}
      onClick={() => handleClick(group, label)}
    >
      <Checkbox id={label} checked={selected} readOnly />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}

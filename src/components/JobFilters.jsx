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
    "Ahmedabad",
    "Bangalore",
    "Bhubaneswar",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Delhi",
    "Gurugram",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kochi",
    "Kolkata",
    "Mumbai",
    "Noida",
    "Pune",
    "Surat",
    "Udaipur",
    "Vadodara"
  ];  

  const niches = [
    "AI Engineer",
    "AR/VR Developer",
    "Android Developer",
    "Application Developer",
    "Backend Developer",
    "Big Data Engineer",
    "Blockchain Developer",
    "Cloud Engineer",
    "Cybersecurity Specialist",
    "Data Engineer",
    "Data Scientist",
    "Database Administrator",
    "DevOps Engineer",
    "Embedded Systems Engineer",
    "Frontend Developer",
    "Fullstack Developer",
    "Game Developer",
    "IT Consultant",
    "IT Support Specialist",
    "iOS Developer",
    "Machine Learning Engineer",
    "Network Engineer",
    "Product Manager",
    "QA Engineer",
    "Scrum Master",
    "Site Reliability Engineer (SRE)",
    "Solutions Architect",
    "System Administrator",
    "Technical Writer",
    "Test Automation Engineer",
    "UI/UX Designer",
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

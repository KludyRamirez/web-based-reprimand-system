import React, { useState, useEffect } from "react";
import {
  BsCalendar4,
  BsCalendar4Week,
  BsCaretDown,
  BsCheckCircle,
  BsFilter,
} from "react-icons/bs";
import CasesPerMonthBarChart from "../statisticsUtils/CasesPerMonthBarChart";

const majorViolation = [
  "Smoking or vaping",
  "Possession of alcoholic beverages or coming to school under the influence of alcohol",
  "Tampering of posters or other school information media",
  "Refusal to submit to reasonable inspection conducted by authorized personnel",
  "Bringing outsiders or providing any means for entry in the University premises without consent of the concerned authority",
  "Ridiculing of fellow students / Rumor mongering",
  "Failure to appear before school authorities when required to report within 48 hours without valid",
  "Lewd Act / Boisterous remark/Use of profane or indecent language",
  "Public Display of Affection",
  "Unauthorized use of PLV logo or seal, or other university markers or symbols including accredited students' organization",
  "Unauthorized representation to any activity / event / opportunity in behalf of the University student organization",
];

const minorViolation = [
  "Incomplete uniform",
  "Sporting very sophisticated hair style, clothing, and accessories",
  "Unkempt / Long hair for boys",
  "Hair dyeing",
  "Sporting visible tattoos",
  "Excessive body piercing",
  "Littering",
  "Loitering",
  "Unauthorized use of classrooms and other school facilities and supplements",
  "Unauthorized entry to restricted and designated areas",
];

const CasesPerMonthFilter = ({ cases, students, getCases }) => {
  const [activeMainFilter, setActiveMainFilter] = useState("All");
  const [reportedViolation, setReportedViolation] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dateOfIncident, setDateOfIncident] = useState("All");
  const [years, setYears] = useState([]);
  const [minorPercentage, setMinorPercentage] = useState("Percentage");
  const [majorPercentage, setMajorPercentage] = useState("Percentage");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = 0; i <= 4; i++) {
      yearsArray.push(currentYear - i);
    }
    setYears(yearsArray);
  }, []);

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filterCases = (
    cases,
    dateOfIncident,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  ) => {
    return cases.filter((c) => {
      const reportedViolationMatch =
        reportedViolation === "All" ||
        c?.reportedViolation
          ?.toLowerCase()
          .includes(reportedViolation?.toLowerCase());

      const mainFilterMatch =
        activeMainFilter === "All" || c?.typeOfViolation === activeMainFilter;

      const statusMatch =
        selectedStatus === "All" || c?.statusOfCase === selectedStatus;

      const dateOfIncidentMatch =
        dateOfIncident === "All" ||
        new Date(c.dateOfIncident).getFullYear() ===
          new Date(dateOfIncident).getFullYear();

      return (
        dateOfIncidentMatch &&
        reportedViolationMatch &&
        mainFilterMatch &&
        statusMatch
      );
    });
  };

  const filteredCases = filterCases(
    cases,
    dateOfIncident,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  );

  let combinedFilteredCases = [...filteredCases];

  const majorCases = cases.filter((c) => c.typeOfViolation === "Major");
  const minorCases = cases.filter((c) => c.typeOfViolation === "Minor");

  const totalPercentageConverter = () => {
    return (
      <>
        <div className="text-[48px] text-[#007bff] font-bold">
          {cases.length}
          <span className="text-[20px]"></span>
        </div>
      </>
    );
  };

  const minorPercentageConverter = () => {
    const fraction = minorCases?.length / cases?.length;
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#FFBF00] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const minorNumberConverter = () => {
    return (
      <>
        <div className="text-[48px] text-[#FFBF00] font-bold">
          {minorCases?.length}
          <span className="text-[20px]"></span>
        </div>
      </>
    );
  };

  const majorPercentageConverter = () => {
    const fraction = majorCases?.length / cases?.length;
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#ff3131] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const majorNumberConverter = () => {
    return (
      <>
        <div className="text-[48px] text-[#ff3131] font-bold">
          {majorCases?.length}
          <span className="text-[20px]"></span>
        </div>
      </>
    );
  };

  const handleSetMinorPercentage = () => {
    if (minorPercentage === "Percentage") setMinorPercentage("Number");
    else {
      setMinorPercentage("Percentage");
    }
  };

  const handleSetMajorPercentage = () => {
    if (majorPercentage === "Percentage") setMajorPercentage("Number");
    else {
      setMajorPercentage("Percentage");
    }
  };

  return (
    <>
      <div className="flex justify-start items-center gap-4">
        <div className="p-2 w-[206px] h-[180px] bg-blue-100  rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden">
          <div className="pl-1 w-[100%] h-[100%] flex justify-center items-end">
            {totalPercentageConverter()}
          </div>
          <div className="text-[16px] text-[#007bff]">Total Cases</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{ stroke: "none", fill: "#007bff" }}
            ></path>
          </svg>
        </div>
        <div
          onClick={() => handleSetMinorPercentage()}
          className="p-2 w-[206px] h-[180px] bg-yellow-100  rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
        >
          <div className=" w-[100%] h-[100%] flex justify-center items-end">
            {minorPercentage === "Percentage" ? (
              <>{minorPercentageConverter()}</>
            ) : (
              <>{minorNumberConverter()}</>
            )}
          </div>
          <div className="text-[16px] text-[#FFBF00]">Minor Cases</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{ stroke: "none", fill: "#FFBF00" }}
            ></path>
          </svg>
        </div>

        <div
          onClick={() => handleSetMajorPercentage()}
          className="p-2 w-[206px] h-[180px] bg-red-100 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
        >
          <div className="w-[100%] h-[100%] flex justify-center items-end">
            {majorPercentage === "Percentage" ? (
              <>{majorPercentageConverter()}</>
            ) : (
              <>{majorNumberConverter()}</>
            )}
          </div>
          <div className="text-[16px] text-[#ff3131]">Major Cases</div>
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{ stroke: "none", fill: "#ff3131" }}
            ></path>
          </svg>
        </div>
      </div>

      <div className="mt-4 w-100 bg-[white] text-[#404040] rounded-[10px] flex flex-col border-[1px]">
        <div className="px-3 w-100 h-[58px] flex justify-between gap-2 border-b-2 border-white">
          <div className="flex justify-start items-center gap-2">
            <div
              onClick={() => handleMainFilterChange("All")}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === "All"
                  ? "border-b-2 border-blue-600"
                  : "border-b-2 border-white"
              }`}
            >
              All Cases
            </div>

            <div
              onClick={() => handleMainFilterChange("Minor")}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === "Minor"
                  ? "border-b-2 border-blue-600"
                  : "border-b-2 border-white"
              }`}
            >
              Minor
            </div>
            <div
              onClick={() => handleMainFilterChange("Major")}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === "Major"
                  ? "border-b-2 border-blue-600"
                  : "border-b-2 border-white"
              }`}
            >
              Major
            </div>
          </div>
          <div className="flex justify-center items-center pr-2">
            <BsFilter className="text-[28px]" />
          </div>
        </div>

        <div className="w-100 flex justify-start bg-gradient-to-br from-gray-100 to-gray-100 p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 phone:gap-2">
            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[158px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Violation</div> <BsCaretDown />
                </div>
                <BsCalendar4 />
              </div>
              <select
                onChange={(e) => setReportedViolation(e.target.value)}
                className="px-3 py-2 w-[158px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                {activeMainFilter === "Minor" || activeMainFilter === "All" ? (
                  <>
                    {minorViolation?.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </>
                ) : null}
                {activeMainFilter === "Major" || activeMainFilter === "All" ? (
                  <>
                    {majorViolation?.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>
            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className=" w-[158px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Case Status</div> <BsCaretDown />
                </div>
                <BsCheckCircle />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 w-[158px] phone:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Investigation">Investigation</option>
                <option value="Evaluation">Evaluation</option>
                <option value="Referral">Referral</option>
                <option value="Hearing">Hearing</option>
                <option value="Decision">Decision</option>
                <option value="Implementation">Implementation</option>
                <option value="Case Solved">Case Solved</option>
              </select>
            </div>

            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className=" w-[158px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Year</div> <BsCaretDown />
                </div>
                <BsCalendar4Week />
              </div>
              <select
                value={dateOfIncident}
                onChange={(e) => {
                  setDateOfIncident(e.target.value);
                }}
                className="phone:w-[100%] px-3 py-2 w-[158px] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none focus:border-[#aaaaaa] focus:border-[1px] border-[1px] "
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <CasesPerMonthBarChart
          cases={combinedFilteredCases}
          students={students}
          getCases={getCases}
        />
      </div>
    </>
  );
};

export default CasesPerMonthFilter;

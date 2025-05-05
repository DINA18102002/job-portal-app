import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";

const Jobs = () => {
  const [jobList, setJobList] = useState([{}]);
  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">Recommended Jobs</div>
          <Sort />
        </div>

        <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {jobList.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Jobs;

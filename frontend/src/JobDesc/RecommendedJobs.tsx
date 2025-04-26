import { jobList } from "../Data/JobsData";
import JobCard from "../FindJobs/JobCard";
import Jobs from "../FindJobs/Jobs";

const RecommendedJobs = () =>{
    return(
        <div className="w-1/4">
            <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
            <div className="flex flex-col flex-wrap gap-5 justify-around">
                {
                    jobList.map((job:any, index:any) => index<6 && <JobCard key={index} {...job} />)
                }
            </div>
        </div>
    );
}
export default RecommendedJobs;
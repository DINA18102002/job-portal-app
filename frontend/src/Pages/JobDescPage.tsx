import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import JobDesc from "../JobDesc/JonDesc";
import RecommendedJobs from "../JobDesc/RecommendedJobs";

const JobDescPage= () =>{
    return(
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
            <Link className="my-5 inline-block" to="/find-jobs">
                    <Button leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" variant="light" >Back</Button>
            </Link>
            <div className="flex gap-5 justify-around p-5">
                <JobDesc/>
                <RecommendedJobs/>
            </div>
        </div>
    );
}
export default JobDescPage;
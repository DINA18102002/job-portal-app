import { Tabs } from "@mantine/core";
import { jobList } from "../Data/JobsData";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const profile = useSelector((state: any) => state.profile);
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleTabChange = (value: string | null) => {
    setActiveTab(value);
    if (value == "SAVED") {
      setShowList(
        jobList.filter((job: any) => profile.savedJobs?.includes(jobList.id))
      );
    } else {
      setShowList(
        jobList.filter(
          (job: any) =>
            job.applicants?.filter(
              (applicant: any) =>
                applicant.applicantId == profile.id &&
                applicant.applicationStatus == value
            ).length > 0
        )
      );
    }
  };
  return (
    <div className="">
      <div className="text-2xl font-semibold mb-5 ">Job history</div>
      <div>
        <Tabs
          variant="outline"
          radius="lg"
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="flex mt-10 flex-wrap gap-5">
              {showList.map((job: any, index: any) => (
                <Card key={index} {...job} applied />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};
export default JobHistory;

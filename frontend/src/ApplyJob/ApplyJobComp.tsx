import {
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";

const ApplyJobComp = () => {
  const navigate = useNavigate();

  return (
    <div className="w-2/3 mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img className="h-14 " src={`/Icons/Google.png`} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-2xl">Software Engineer</div>
            <div className="text-lg text-mine-shaft-300">
              Google &bull; 3 days ago &bull; 48 Applicants
            </div>
          </div>
        </div>
      </div>
      <Divider size="xs" my="xl" />
      <ApplicationForm />
    </div>
  );
};
export default ApplyJobComp;

import { talents } from "../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";

const Talents = () => {
  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">Talents</div>
          <Sort />
        </div>

        <div className="mt-10 grid gap-5 justify-items-center grid-cols-[repeat(auto-fit,minmax(24rem,1fr))]">
          {
            talents.map((talent, index) => 
              <TalentCard key={index} {...talent} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Talents;
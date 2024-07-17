import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@context/store";

function ResourcesTab() {
  const { finalUser, theme } = useContext(Context);
  const router = useRouter();

  const handleButtonClick = (resourceKey) => {
    const url = `/resourcesdetails?folder=${resourceKey}&htmlUrl=https://github.com/mdazfar2/HelpOps-Hub/tree/main/${resourceKey}&isLike=true`;
    router.push(url);
  };

  return (
    <div className="relative overflow-hidden w-full h-full bg-gray-100 p-10">
      <div className="text-center text-2xl mb-10">Saved Resources</div>
      <div className="bg-white shadow rounded p-5">
        {finalUser?finalUser.resource &&
          Object.keys(finalUser.resource).map((resourceKey) => (
            <div
              key={resourceKey}
              className="border-b last:border-0 p-3 flex justify-between items-center rounded-xl hover:bg-gray-200"
            >
              <div>
                <div className="text-lg font-semibold">{resourceKey}</div>
                <div className="text-sm text-gray-600">
                  {finalUser.resource[resourceKey].title}
                </div>
              </div>
              <button
                className={`w-28 text-center h-12 p-2 ${
                  theme ? "bg-[#6089a4] text-white" : "bg-white text-black"
                } border-none rounded-2xl cursor-pointer text-base`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick(resourceKey);
                }}
              >
                Open
              </button>
            </div>
          )):""}
      </div>
    </div>
  );
}

export default ResourcesTab;

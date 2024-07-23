"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faExclamationCircle,
  faSyncAlt,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faLightbulb,
  faComments,
  faCheckCircle,
  faHeart,
  faEye,
} from "@fortawesome/free-regular-svg-icons";

const Sidebar01Item = ({ title, isActive, onClick, icon }) => {
  return (
    <div
      className={`${
        isActive
          ? "bg-[#6089a4] hover:bg-[#6089a4] text-white"
          : "hover:bg-[#deecf5] hover:text-[#6089a4]"
      } text-sm min-h-3 text-gray-800 px-3 transition-all duration-500 py-2 w-full cursor-pointer`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" /> {title}
    </div>
  );
};

const Tag = ({ name }) => (
  <div className="bg-gray-200 px-4 py-1 text-gray-700 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-500">
    {name}
  </div>
);

const RecentTopics = ({ topic, img, user }) => (
  <div className="flex flex-wrap items-center gap-2 text-[13px] text-gray-500">
    <span className="inline">
      <FontAwesomeIcon icon={faComments} /> {topic}
    </span>
    <span className="inline">Question By -</span>
    <span className="flex items-center gap-2">
      <img src={img} alt="User" className="rounded-full w-5 h-5" />
      <span className="text-black">{user}</span>
    </span>
    <hr className="w-full border-gray-300 border-1" />
  </div>
);

const HelpfulUser = ({ user }) => (
  <div>
    <div className="flex items-center justify-between gap-2 mt-6">
      <div className="flex gap-2 items-center">
        <img src={user.img} alt="User" className="rounded-full w-8 h-8" />
        <div>{user.name}</div>
      </div>
      <div className="text-sm text-gray-500 flex gap-2 items-center">
        <FontAwesomeIcon icon={faCheckCircle} />
        {user.issuesSolved}
      </div>
    </div>
    <hr className="border-gray-200 border-[1px] mt-2" />
  </div>
);
const TopIssue = ({ title, index }) => (
  <div className="flex items-center justify-between py-2">
    <span className=" text-base mr-4 border-gray-300 border-[1px] px-2 py-1 rounded-full">
      {index + 1 < 10 ? `0${index + 1}` : index + 1}
    </span>
    <span className="text-sm">{title}</span>
  </div>
);

function ForumPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("View All");

  const handleSidebar01 = (title) => {
    setActiveMenuItem(title);
  };

  const tags = [
    "Docker",
    "Devops",
    "Azure",
    "Ubuntu",
    "NeedHelp",
    "Dockerization",
    "CI/CD",
    "AWS",
    "Kubernetes",
  ];

  const recent = [
    {
      topic: "Issue with Kubernetes Pod Scaling",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      user: "Alice",
    },
    {
      topic: "Troubleshooting Docker Container Networking",
      img: "https://randomuser.me/api/portraits/men/2.jpg",
      user: "Bob",
    },
    {
      topic: "Configuring AWS IAM Roles for EKS",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      user: "Charlie",
    },
  ];

  const issues = [
    {
      userImage: "https://randomuser.me/api/portraits/men/1.jpg",
      title: "Kubernetes Pod Scaling Issue",
      type: "General",
      dateTime: "26 minutes ago",
      reactions: { likes: 5, views: 420, comments: 70 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
      ],
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/4.jpg",
      title: "Docker Container Networking Problem",
      type: "Ideas",
      dateTime: "2 hours ago",
      reactions: { likes: 5, views: 420, comments: 70 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/men/6.jpg",
      ],
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/7.jpg",
      title: "AWS IAM Role Configuration for EKS",
      type: "General",
      dateTime: "December 01, 2020 at 8:16 pm",
      reactions: { likes: 5, views: 420, comments: 70 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/8.jpg",
        "https://randomuser.me/api/portraits/men/9.jpg",
      ],
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/10.jpg",
      title: "Azure DevOps Pipeline Failure",
      type: "Help",
      dateTime: "November 27, 2020 at 10:15 pm",
      reactions: { likes: 5, views: 420, comments: 70 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/11.jpg",
        "https://randomuser.me/api/portraits/men/12.jpg",
      ],
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/13.jpg",
      title: "Docker Compose Not Starting Services",
      type: "General",
      dateTime: "10 minutes ago",
      reactions: { likes: 5, views: 320, comments: 50 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/14.jpg",
        "https://randomuser.me/api/portraits/men/15.jpg",
      ],
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/16.jpg",
      title: "GitLab CI/CD Runner Not Triggering",
      type: "Help",
      dateTime: "1 hour ago",
      reactions: { likes: 10, views: 220, comments: 30 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/17.jpg",
        "https://randomuser.me/api/portraits/men/18.jpg",
      ],
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/19.jpg",
      title: "Helm Chart Installation Error",
      type: "General",
      dateTime: "2 days ago",
      reactions: { likes: 15, views: 500, comments: 80 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/20.jpg",
        "https://randomuser.me/api/portraits/men/21.jpg",
      ],
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/22.jpg",
      title: "AWS CloudFormation Stack Creation Timeout",
      type: "Help",
      dateTime: "4 hours ago",
      reactions: { likes: 8, views: 310, comments: 40 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/23.jpg",
        "https://randomuser.me/api/portraits/men/24.jpg",
      ],
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/25.jpg",
      title: "Terraform State File Locking Issue",
      type: "Ideas",
      dateTime: "3 hours ago",
      reactions: { likes: 12, views: 450, comments: 60 },
      discussionUsers: [
        "https://randomuser.me/api/portraits/men/26.jpg",
        "https://randomuser.me/api/portraits/men/27.jpg",
      ],
    },
  ];

  const helpfulUsers = [
    {
      name: "cleo-parra",
      img: "https://randomuser.me/api/portraits/men/13.jpg",
      issuesSolved: 10,
    },
    {
      name: "roy_marin",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
      issuesSolved: 8,
    },
    {
      name: "hellen.austin",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
      issuesSolved: 5,
    },
    {
      name: "erna.may",
      img: "https://randomuser.me/api/portraits/men/16.jpg",
      issuesSolved: 3,
    },
  ];
  const devopsIssues = [
    "Issue with Kubernetes Pod Scaling",
    "Troubleshooting Docker Container Networking",
    "Configuring AWS IAM Roles for EKS",
    "Azure DevOps Pipeline Failure",
    "Docker Compose Not Starting Services",
    "Kubernetes Cluster Authentication Issue",
  ];
  return (
    <div className="mt-20">
      <div className="h-80 bg-gray-200 px-10 pt-20 relative">
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Search for Topics..."
            className="py-3 shadow-md px-4 border rounded-full w-full z-50 max-w-md focus:outline-none"
          />
          <div className="mt-4">Popular Searches: Docker, Azure, CI/CD</div>
        </div>
        <img src="/forum.png" alt="img" className="w-[95%] absolute bottom-0" />
      </div>
      <div className="w-full h-12 bg-[#dbe2e8]"></div>
      <div className="min-h-screen w-full">
        <div className="flex w-full gap-10 p-16">
          <div className="w-[15%]">
            <div>
              <div className="text-lg font-semibold">Forums</div>
              <div className="flex flex-col gap-1 mt-4">
                <Sidebar01Item
                  title="View All"
                  onClick={() => handleSidebar01("View All")}
                  isActive={activeMenuItem === "View All"}
                  icon={faList}
                />
                <Sidebar01Item
                  title="General"
                  onClick={() => handleSidebar01("General")}
                  isActive={activeMenuItem === "General"}
                  icon={faUser}
                />
                <Sidebar01Item
                  title="Ideas"
                  onClick={() => handleSidebar01("Ideas")}
                  isActive={activeMenuItem === "Ideas"}
                  icon={faLightbulb}
                />
                <Sidebar01Item
                  title="User Feedback"
                  onClick={() => handleSidebar01("User Feedback")}
                  isActive={activeMenuItem === "User Feedback"}
                  icon={faComments}
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="text-lg font-semibold">Tags</div>
              <div className="flex flex-wrap mt-5 gap-4">
                {tags.map((tag, index) => (
                  <Tag key={index} name={tag} />
                ))}
              </div>
            </div>
            <div className="mt-10">
              <div className="text-lg font-semibold">Recent Topics</div>
              <div className="flex flex-wrap mt-5 gap-4 cursor-pointer">
                {recent.map((item, index) => (
                  <RecentTopics
                    key={index}
                    topic={item.topic}
                    img={item.img}
                    user={item.user}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-[60%]">
            <div className="border-[1px] border-gray-300 min-h-screen">
              <div className="h-16 bg-[#6089a4] text-white px-12">
                <div className="flex justify-between items-center h-full">
                  <div className="flex gap-5 items-center">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                      <span>15 Open</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>202 Closed</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <FontAwesomeIcon icon={faSyncAlt} />
                      <span>Reset</span>
                    </div>
                  </div>
                  <div className="flex gap-12 items-center">
                    <div className="flex gap-2 items-center cursor-pointer">
                      Author <FontAwesomeIcon icon={faChevronDown} size="xs" />
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer">
                      Label <FontAwesomeIcon icon={faChevronDown} size="xs" />
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer">
                      Sort <FontAwesomeIcon icon={faChevronDown} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="p-4 mb-4 border-b-[1px] border-gray-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={issue.userImage}
                          alt="User"
                          className="rounded-full w-10 h-10"
                        />
                        <div>
                          <div className="font-medium">{issue.title}</div>
                          <div className="text-gray-500 text-sm mt-2">
                            {issue.type} • {issue.dateTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-gray-500">
                        <div className="flex items-center gap-1 hover:gap-2 transition-all duration-500 mt-2">
                          {issue.discussionUsers.map((userImg, idx) => (
                            <img
                              key={idx}
                              src={userImg}
                              alt="Discussion User"
                              className="rounded-full w-5 h-5"
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>{issue.reactions.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faComments} />
                          <span>{issue.reactions.comments}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faEye} />
                          <span>{issue.reactions.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex justify-between mb-20">
              <div>Total:220</div>
              <div className="flex gap-5 items-center">
                <FontAwesomeIcon icon={faChevronLeft} />
                <div>Previous</div>
                <div className="bg-[#6089a4] px-2 rounded-lg text-white">1</div>
                <div>2</div>
                <div>3</div>
                <div>......</div>
                <div>21</div>
                <div>Next</div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div>Go {"->"}</div>
            </div>
          </div>
          <div className="w-[20%]">
            <div className="bg-[#6089a4] rounded-full text-white py-5 px-3 text-center text-base">
              <FontAwesomeIcon icon={faComments} /> Ask Question{" "}
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className="border-[1px] border-gray-200 mt-10 text-lg rounded-lg p-4">
              <div>Most Helpful</div>
              <div className="text-sm cursor-pointer">
                {helpfulUsers.map((user, index) => (
                  <HelpfulUser key={index} user={user} />
                ))}
              </div>
            </div>
            <div className="border-[1px] border-gray-200 mt-10 text-lg rounded-lg p-4">
              <div>Top</div>
              <div className="space-y-4 mt-2 cursor-pointer">
                {devopsIssues.map((issue, index) => (
                  <TopIssue key={index} title={issue} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;

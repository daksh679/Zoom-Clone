"use client";

import { useState } from "react";
import Homecard from "./Homecard";
import MeetingModal from "./MeetingModal";

// import Image from "next/image";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isScheduleMetting" | "isInstantMeeting" | undefined
  >();
  const createMeeting = () => {};

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
      <Homecard
        imgUrl="/icons/add-meeting.svg"
        className="bg-orange-1"
        title="New Meeting"
        description=""
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <Homecard
        imgUrl="/icons/schedule.svg"
        className="bg-blue-1"
        title="Schedule Meeting"
        description=""
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <Homecard
        imgUrl="/icons/recordings.svg"
        className="bg-purple-1"
        title="View Recordings"
        description=""
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <Homecard
        imgUrl="/icons/join-meeting.svg"
        className="bg-yellow-1"
        title="Join Meeting "
        description=""
        handleClick={() => setMeetingState("isInstantMeeting")}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onclose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting "
        className="text-center"
        buttonText="Start Meeting"
        handleCLick={createMeeting}
        image=""
      />
    </section>
  );
};

export default MeetingTypeList;

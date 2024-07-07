"use client";

import { useState } from "react";
import Homecard from "./Homecard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

// import Image from "next/image";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isScheduleMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const { user } = useUser();
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a time and date",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description: description,
          },
        },
      });

      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "failed to create a meeting",
      });
    }
  };

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onclose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleCLick={createMeeting}
          buttonText=""
          image=""
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
              <Textarea />
            </label>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onclose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleCLick={() => {
            // navigator.clipboard.writeText(meetingLink);
            // toast({ title: "Link copied" });
          }}
          image="/icons/checked.svg"
        />
      )}

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

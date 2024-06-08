import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  onclose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  buttonText: string;
  handleCLick: () => void;
  image: string;
  btnIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onclose,
  title,
  className,
  children,
  buttonText,
  handleCLick,
  image,
  btnIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onclose}>
      <DialogContent className="flex w-full max-width-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="">
              <Image src={image} alt="image" height={72} width={72} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;

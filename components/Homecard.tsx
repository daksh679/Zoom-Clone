import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Interface } from "readline";

interface HomePageProps {
  imgUrl: string;
  title: string;
  description: string;
  handleClick: () => void;
  className: string;
}

const Homecard = ({
  imgUrl,
  title,
  description,
  handleClick,
  className,
}: HomePageProps) => {
  return (
    <div>
      <div
        className={cn(
          " flex flex-col justify-between  px-4 py-6 w-full rounded-[14px] min-h-[260px] xl:max-w-[270px]",
          className
        )}
        onClick={handleClick}
      >
        <div className="flex-center glassmorphism size-12 rounded-[10px]">
          <Image src={imgUrl} alt="Add Meeting" width={27} height={27} />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Homecard;

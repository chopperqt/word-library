interface SkeletonProps {
  height: number;
  width?: number;
}
const Skeleton = ({ height, width }: SkeletonProps) => {
  let formattedWidth = "w-full";

  if (!!width) {
    formattedWidth = `w-[${width.toString()}px]`;
  }

  const className = `flex ${formattedWidth} bg-neutral-300 rounded-[8px]`;

  return <div className={className} style={{ height: `${height}px` }} />;
};

export default Skeleton;

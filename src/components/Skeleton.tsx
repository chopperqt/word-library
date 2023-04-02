interface SkeletonProps {
  height: number;
  width?: number;
}
const Skeleton = ({ height, width }: SkeletonProps) => {
  let formattedWidth = "w-full";

  if (!!width) {
    formattedWidth = `w-[${width}px]`;
  }

  return (
    <div
      className={`${formattedWidth} flex bg-neutral-300 rounded-[8px]`}
      style={{ height: `${height}px` }}
    />
  );
};

export default Skeleton;

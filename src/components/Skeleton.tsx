
interface SkeletonProps {
  height: number
}
const Skeleton = ({
  height
}: SkeletonProps) => (
  <div
    className="w-full bg-neutral-300"
    style={{ height: `${height}px` }}
  />
)

export default Skeleton
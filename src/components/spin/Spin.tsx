import './Spin.css'

interface SpinProps {
  width?: number
  height?: number
}
const Spin = ({
  width,
  height,
}: SpinProps) => (
  <div
    className="lds-dual-ring"
    style={{
      width: `${width}px`,
      height: `${height}px`,
    }}
  />
)

export default Spin
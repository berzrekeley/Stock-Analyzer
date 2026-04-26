function Sk({ h = 16, w = '100%', className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ height: h, width: w, borderRadius: 6 }}
    />
  )
}

export function PageSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <Sk h={32} w="40%" />
      <Sk h={16} w="60%" />
      <div className="grid grid-cols-4 gap-4 mt-2">
        {[...Array(4)].map((_, i) => <Sk key={i} h={140} />)}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Sk h={200} />
        <Sk h={200} />
      </div>
      <Sk h={300} />
      <Sk h={80} />
    </div>
  )
}

export function ChartSkeleton({ height = 240 }) {
  return <Sk h={height} />
}

export function CardSkeleton({ height = 160 }) {
  return <Sk h={height} />
}

export default Sk

export default function BadgeIcon({ count }) {
  if (count > 0) {
    return (
      <span className="absolute inset-0 object-right-top -mr-6">
        <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">
          {count}
        </div>
      </span>
    )
  } else {
    return null
  }
}
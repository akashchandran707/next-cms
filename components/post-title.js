export default function PostTitle({ children }) {
  return (
    <h1 className="post-title font-bold tracking-tighter leading-tight text-center md:text-left">
      {children}
    </h1>
  )
}

/** Re-mounts on every navigation, so each page gently rises in. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

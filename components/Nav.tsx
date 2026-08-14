import Link from "next/link";

export function Nav() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="Mạnh Đức home">
          <span className="brand-mark">MD</span>
          <span>Mạnh Đức</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/#about">About</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/projects/mini-soc">Case Study</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

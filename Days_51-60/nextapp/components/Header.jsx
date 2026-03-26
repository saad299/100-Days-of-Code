import Link from "next/link";
const Header = () => {
  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-bold bg-amber-400">
          This is a Header
        </h1>
      </div>
      <div>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Header;

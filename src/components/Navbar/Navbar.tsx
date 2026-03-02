import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <Link href="/">Home</Link> |{" "}
            <Link href="/schedule">Schedule</Link> |{" "}
            <Link href="/scores">Scores</Link> |{" "}
            <Link href="/stats">Stats</Link>
        </nav>
    );
}
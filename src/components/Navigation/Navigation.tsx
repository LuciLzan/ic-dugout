import Link from "next/link";
import "./Navigation.css"



export default function Navigation() {
    return (
        <nav className="navigation">
            <Link className={"nav-link"} href="/">
                Home
            </Link>
            <Link className={"nav-link"} href="/schedule">
                Schedule
            </Link>
            <Link className={"nav-link"} href="/scores">
                Scores
            </Link>
            <Link className={"nav-link"} href="/stats">
                Stats
            </Link>
        </nav>
    );
}
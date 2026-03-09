"use client";

import "./Members.css"

import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

function Bio() { return (
    <div className={"scoop-content"}>
        <p>Megan Doolittle is a Senior RF from Belleville IL. Having played with the Lady Blues for four years, she has proven one of the most reliable players on the whole team known for her support and encouraging attitude</p>
    </div>
); }
function Plays() { return (
    <div className={"scoop-content"}>
        <p>Megan Doolittle made waves this week for her incredible three-run-home-run against Simmons last Friday, where she got the go-ahead and was able to clutch a victory for the Lady Blues</p>
    </div>
); }
function Statement() { return (
    <div className={"scoop-content"}>
        <p>Megan said this in regard to her play: "It was so great to hit it, I couldn't stop smiling in the dugout!"</p>
    </div>
); }
export default function MemberPage() {
    return (
        <div className="member-page">
            <h2>Welcome to the inside scoop!</h2>

            <p>This weeks player: Megan Doolittle!</p>
            <p>Click the links below for more info</p>

            <BrowserRouter>
                <nav className={"scoop-nav"}>
                    <Link to="/member/bio">Bio</Link>
                    <Link to="/member/plays">Notable Plays</Link>
                    <Link to="/member/statement">Personal Statement</Link>
                </nav>

                <Routes>
                    <Route path="/member" element={<Navigate to="/member/bio" replace />} />
                    <Route path="/member/bio" element={<Bio />} />
                    <Route path="/member/plays" element={<Plays />} />
                    <Route path="/member/statement" element={<Statement />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
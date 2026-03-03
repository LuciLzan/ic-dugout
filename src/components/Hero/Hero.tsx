"use client"

import Image from "next/image";
import Link from "next/link";

import tallActionShot from "../../../public/action_shot_800x1200.png"
import wideActionShot from "../../../public/action-shot-1600x800.png"


import "./Hero.css"

export default function Hero() {
    const actionShot = tallActionShot;


    return (
        <div className="hero">
            <Image
                className="hero-background-image"
                src={actionShot}
                alt="Lady Blues"
                fill
                style={{ objectFit: "cover" }}
                priority
            />
            <div className="hero-content">
                <h1 className="hero-title">Welcome to the IC Dugout, Home of the Lady Blues!</h1>
                <Link className="hero-link" href="/schedule">Upcoming Games</Link>
            </div>
        </div>
    );
}
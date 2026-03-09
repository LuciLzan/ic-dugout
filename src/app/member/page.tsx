"use client"
import dynamic from "next/dynamic";

const MemberContent = dynamic(() => import("./MemberPage"), { ssr: false });

export default function MemberPage() {
    return <MemberContent />;
}
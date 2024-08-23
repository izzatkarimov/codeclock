import { Orbitron } from "next/font/google";
import React from 'react'
import Button from "./Button";
import Calendar from "./Calendar";
import Link from "next/link";
import CallToAction from "./CallToAction";
const orbitron = Orbitron({ subsets: ["latin"], weight: ['400'] });

export default function Hero() {
  return (
    <div className='py-4 sm:py-12 flex flex-col gap-8 sm:gap-10 '>
      <h1 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + orbitron.className}><span className="textGradient">CodeClock</span> is your ultimate tool to track your daily <span className="textGradient">Coding</span> habits!</h1>
      <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px] '>Create your coding tracker and see your <span className="font-semibold">progress</span></p>
      <CallToAction />
      <Calendar demo/>
    </div>
  )
}
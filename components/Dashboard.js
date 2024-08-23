'use client'
import { Orbitron } from "next/font/google";
import React, { useEffect, useState }from 'react'
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

const orbitron = Orbitron({ subsets: ["latin"], weight: ['400'] });


export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  function countValues() {
    let total_number_of_days = 0
    let sum_tracks = 0
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_track = data[year][month][day]
          total_number_of_days++
          sum_tracks += days_track
        }
      }
    }
    return { num_days: total_number_of_days, average_hour: sum_tracks / total_number_of_days }
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  }

  async function handleSetTrack(track) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try {
      const newData = { ...userDataObj }
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }

      newData[year][month][day] = track
      setData(newData)
      setUserDataObj(newData)
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: track
          }
        }
      }, { merge: true })
    } catch (err) {
      console.log("Failed to set data: ", err.message)
    }
  }

  const tracks = {
    '1 hour': '😶',
    '2 hours': '🙂',
    '3 hours': '🤩',
    '4 hours': '😎',
    '4+ hours': '🗿',
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)
  }, [currentUser, userDataObj])

  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }

  return (
    <div className=' flex flex-col flex-1 gap-8 sm:gap-10 md:gap-16 '>
      <div className=' grid grid-cols-3 bg-indigo-50 text-indigo-500  p-4 gap-4 rounded-lg '>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className=' flex flex-col gap-1 sm:gap-2 ' >
              <p className=' font-medium capitalize text-xs sm:text-sm truncate '>{status.replaceAll('_', ' ')}</p>
              <p className={ ' text-base sm:text-lg truncate ' + orbitron.className }>{statuses[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
            </div>
          )
        })}
      </div>
      <h4 className={' text-5xl sm:text-6xl md:text-7xl text-center ' + orbitron.className}>
        How many hours have you <span className='textGradient'>coded</span> today?
      </h4>
      <div className=' flex items-stretch flex-wrap gap-4 '>
        {Object.keys(tracks).map((track, trackIndex) => {
          return (
            <button onClick={() => {
              const currentTrackValue = trackIndex + 1
              handleSetTrack(currentTrackValue)
            }} className={' p-4 px-5 rounded-2xl purpleShadow duration=200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 '} key={trackIndex}>
              <p className=' text-4xl sm:text-5xl md:text-6xl '>{tracks[track]}</p>
              <p className={ ' text-indigo-500 text-xs sm:text-sm md:text-base ' + orbitron.className }>{track}</p>
            </button>
          )
        })}
      </div>
      <Calendar completeData={data} handleSetTrack={handleSetTrack} />
    </div>
  )
}
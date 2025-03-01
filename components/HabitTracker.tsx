"use client"

import { useState, useEffect, useRef } from "react"
import { calculateXP, getLevel, checkLevelUp, updateStreak } from "@/lib/gamification"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Check, Award, Flame, RefreshCw, BookOpen, Coffee, Heart, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const habitsList = [
  { id: "sholat", name: "Sholat 5 Waktu", icon: Moon, color: "blue" },
  { id: "quran", name: "Baca Al-Quran", icon: BookOpen, color: "green" },
  { id: "sedekah", name: "Sedekah", icon: Heart, color: "red" },
  { id: "puasa", name: "Puasa", icon: Coffee, color: "orange" },
  { id: "dzikir", name: "Dzikir Pagi & Petang", icon: Sun, color: "yellow" },
]

export default function HabitTracker() {
  const [habits, setHabits] = useState<Record<string, boolean>>({})
  const [xp, setXP] = useState(0)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [xpNotifications, setXpNotifications] = useState<{ id: string; x: number; y: number }[]>([])
  const [xpPercentage, setXpPercentage] = useState(0)
  const [isResetting, setIsResetting] = useState(false)

  const habitRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits") || "{}")
    setHabits(savedHabits)

    const savedXP = Number.parseInt(localStorage.getItem("xp") || "0")
    setXP(savedXP)

    const currentLevel = getLevel(savedXP)
    setLevel(currentLevel)

    setStreak(updateStreak())

    // Calculate XP percentage for progress bar
    const xpForCurrentLevel = (currentLevel - 1) * 100
    const xpForNextLevel = currentLevel * 100
    const xpProgress = savedXP - xpForCurrentLevel
    const xpNeeded = xpForNextLevel - xpForCurrentLevel
    setXpPercentage((xpProgress / xpNeeded) * 100)
  }, [])

  useEffect(() => {
    const prevXP = xp
    const newXP = calculateXP(habits)

    if (newXP > prevXP) {
      // Save XP to localStorage
      localStorage.setItem("xp", newXP.toString())
      setXP(newXP)

      // Calculate new level and XP percentage
      const newLevel = getLevel(newXP)
      setLevel(newLevel)

      const xpForCurrentLevel = (newLevel - 1) * 100
      const xpForNextLevel = newLevel * 100
      const xpProgress = newXP - xpForCurrentLevel
      const xpNeeded = xpForNextLevel - xpForCurrentLevel
      setXpPercentage((xpProgress / xpNeeded) * 100)

      // Check for level up
      if (checkLevelUp(prevXP, newXP)) {
        setShowLevelUp(true)
        setTimeout(() => setShowLevelUp(false), 3000)
      }
    }

    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits, xp])

  const handleHabitToggle = (habitId: string) => {
    const wasCompleted = habits[habitId] || false
    const newHabits = { ...habits, [habitId]: !wasCompleted }
    setHabits(newHabits)


    // If habit was just completed, show XP notification
    if (!wasCompleted) {
      // Play Sound
      const audio = new Audio("coin.wav")
      audio.play()

      const habitElement = habitRefs.current[habitId]
      if (habitElement) {
        const rect = habitElement.getBoundingClientRect()
        const id = Date.now().toString()
        setXpNotifications((prev) => [
          ...prev,
          {
            id,
            x: rect.left + rect.width / 2,
            y: rect.top,
          },
        ])

        // Remove notification after animation completes
        setTimeout(() => {
          setXpNotifications((prev) => prev.filter((n) => n.id !== id))
        }, 1500)
      }
    }
  }

  const resetHabits = () => {
    setIsResetting(true)
    setTimeout(() => {
      setHabits({})
      setIsResetting(false)
    }, 500)
  }

  //if habits completed, prevent user from uncheck it with message that the habits is all completed and it will reset in the next day
  const isAllHabitsCompleted = Object.values(habits).every((habit) => habit === true)
  if (isAllHabitsCompleted) {
    console.log("All habits completed, reset in the next day");
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-[hsl(var(--ramadan-gold)/30%)]">
        <CardHeader className="bg-gradient-to-r from-[hsl(var(--ramadan-blue))] to-[hsl(var(--ramadan-purple))] text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Award className="h-6 w-6 mr-2" />
                Level {level}
              </CardTitle>
              <p className="text-white/80 mt-1">
                {Math.floor(xpPercentage)}% to Level {level + 1}
              </p>
            </div>

            <div className="flex items-center mt-3 md:mt-0">
              <Flame className="h-5 w-5 mr-2 text-[hsl(var(--ramadan-gold))]" />
              <span className="font-bold">{streak} Hari Streak</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>XP: {xp}</span>
              <span>Target: {level * 100}</span>
            </div>
            <Progress value={xpPercentage} className="h-3" />
          </div>

          {showLevelUp && (
            <div className="bg-gradient-to-r from-[hsl(var(--ramadan-gold))] to-[hsl(var(--ramadan-green))] text-white p-4 rounded-lg mb-6 text-center level-up">
              <div className="flex items-center justify-center">
                <Award className="h-6 w-6 mr-2" />
                <span className="text-lg font-bold">Level Up! Sekarang kamu level {level}!</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habitsList.map((habit) => {
              const isCompleted = habits[habit.id] || false
              const HabitIcon = habit.icon

              return (
                <div
                  key={habit.id}
                  ref={(el) => {
                    habitRefs.current[habit.id] = el;
                  }}
                  className={cn(
                    "habit-card relative p-4 rounded-lg border-2 transition-all",
                    isCompleted
                      ? "bg-[hsl(var(--ramadan-green)/10%)] border-[hsl(var(--ramadan-green))]"
                      : "bg-white border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => handleHabitToggle(habit.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-full mr-3",
                        isCompleted ? "bg-[hsl(var(--ramadan-green))]" : `bg-${habit.color}-100`,
                      )}
                    >
                      <HabitIcon className={cn("h-5 w-5", isCompleted ? "text-white" : `text-${habit.color}-500`)} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{habit.name}</h3>
                    </div>

                    <div
                      className={cn(
                        "flex items-center justify-center h-6 w-6 rounded-full border-2",
                        isCompleted
                          ? "bg-[hsl(var(--ramadan-green))] border-[hsl(var(--ramadan-green))]"
                          : "bg-white border-gray-300",
                      )}
                    >
                      {isCompleted && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              className="flex items-center text-gray-500"
              onClick={resetHabits}
              disabled={isResetting}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isResetting && "animate-spin")} />
              Reset Habits
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* XP Notifications */}
      {xpNotifications.map((notification) => (
        <div
          key={notification.id}
          className="xp-notification text-[hsl(var(--ramadan-gold))] font-bold text-lg"
          style={{
            left: `${notification.x}px`,
            top: `${notification.y}px`,
          }}
        >
          +10 XP
        </div>
      ))}
    </div>
  )
}


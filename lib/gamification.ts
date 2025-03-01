export function calculateXP(habits: Record<string, boolean>): number {
    return Object.values(habits).filter(Boolean).length * 10
  }
  
  export function getLevel(xp: number): number {
    return Math.floor(xp / 100) + 1
  }
  
  export function checkLevelUp(prevXP: number, newXP: number): boolean {
    return getLevel(newXP) > getLevel(prevXP)
  }
  
  export function getTodayDate(): string {
    return new Date().toISOString().split("T")[0] // Format YYYY-MM-DD
  }
  
  export function updateStreak(): number {
    const today = getTodayDate()
    const lastCheckDate = localStorage.getItem("lastCheckDate") || ""
    let streak = Number.parseInt(localStorage.getItem("streak") || "0")
  
    if (lastCheckDate === today) return streak // Tidak reset kalau masih di hari yang sama
  
    if (new Date(lastCheckDate).getTime() + 86400000 >= new Date(today).getTime()) {
      streak += 1 // Lanjut streak kalau hari kemarin diisi
    } else {
      streak = 1 // Reset streak kalau bolong sehari
    }
  
    localStorage.setItem("lastCheckDate", today)
    localStorage.setItem("streak", streak.toString())
    return streak
  }
  
  
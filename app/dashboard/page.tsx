import HabitTracker from "@/components/HabitTracker";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white p-5">
      <h1 className="text-2xl font-bold mb-4">📋 Habit Tracker</h1>
      <HabitTracker />
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { MoonStar, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen ramadan-pattern flex flex-col items-center justify-center p-5">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <MoonStar className="h-16 w-16 text-[hsl(var(--ramadan-gold))]" />
            <div className="absolute -top-1 -right-1">
              <div className="h-4 w-4 bg-[hsl(var(--ramadan-green))] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--ramadan-blue))] mb-4">
          Level Up Ramadhan
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Tingkatkan ibadah & kebiasaan baikmu selama Ramadhan dengan cara yang menyenangkan dan memotivasi.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[hsl(var(--ramadan-green)/10%)] p-6 rounded-xl">
            <BookOpen className="h-10 w-10 text-[hsl(var(--ramadan-green))] mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Lacak Ibadah</h3>
            <p className="text-gray-600">Pantau ibadah harianmu dengan mudah</p>
          </div>
          
          <div className="bg-[hsl(var(--ramadan-gold)/10%)] p-6 rounded-xl">
            <Calendar className="h-10 w-10 text-[hsl(var(--ramadan-gold))] mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Bangun Kebiasaan</h3>
            <p className="text-gray-600">Kembangkan rutinitas positif selama Ramadhan</p>
          </div>
          
          <div className="bg-[hsl(var(--ramadan-blue)/10%)] p-6 rounded-xl">
            <div className="flex justify-center mb-3">
              <div className="relative">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Raih XP & Level</h3>
            <p className="text-gray-600">Dapatkan hadiah virtual untuk konsistensimu</p>
          </div>
        </div>
        
        <Link href="/dashboard" passHref>
          <Button className="bg-[hsl(var(--ramadan-green))] hover:bg-[hsl(var(--ramadan-green)/90%)] text-white px-8 py-6 rounded-xl text-lg font-medium">
            Mulai Tracking <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}

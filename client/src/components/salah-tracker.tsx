
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const statuses = [
  { label: "Not Prayed", color: "black" },
  { label: "Late", color: "red" },
  { label: "On Time", color: "yellow" },
  { label: "In Jamaah", color: "green" },
];

export default function SalahTracker() {
  const [selectedPrayer, setSelectedPrayer] = useState("");
  const [prayerStatus, setPrayerStatus] = useState<Record<string, string>>({});
  const [showStats, setShowStats] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [statsPeriod, setStatsPeriod] = useState<'week' | 'month' | 'year' | 'all'>('week');
  
  const calculateStats = () => {
    const now = new Date();
    const periodStart = new Date();
    
    switch(statsPeriod) {
      case 'week':
        periodStart.setDate(now.getDate() - 7);
        break;
      case 'month':
        periodStart.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        periodStart.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
        break;
    }

    // Calculate total possible prayers (5 prayers per day)
    const daysDiff = Math.ceil((now.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));
    const totalPossiblePrayers = daysDiff * 5;
    
    const stats = {
      inJamaah: 0,
      onTime: 0,
      late: 0,
      notPrayed: 0
    };
    
    Object.values(prayerStatus).forEach(status => {
      if (status === "green") stats.inJamaah++;
      if (status === "yellow") stats.onTime++;
      if (status === "red") stats.late++;
      if (status === "black") stats.notPrayed++;
    });

    // Add missing prayers to notPrayed count
    stats.notPrayed += totalPossiblePrayers - Object.values(prayerStatus).length;
    
    return {
      inJamaah: Math.round((stats.inJamaah / totalPossiblePrayers) * 100),
      onTime: Math.round((stats.onTime / totalPossiblePrayers) * 100),
      late: Math.round((stats.late / totalPossiblePrayers) * 100),
      notPrayed: Math.round((stats.notPrayed / totalPossiblePrayers) * 100),
      inJamaahCount: stats.inJamaah,
      onTimeCount: stats.onTime,
      lateCount: stats.late,
      notPrayedCount: stats.notPrayed
    };
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Salah Tracker</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {statuses.map(({label, color}) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: color }}></div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="Fajr" className="w-full">
        <TabsList className="flex flex-wrap justify-between w-full gap-2 divide-x">
          {prayers.map((prayer) => (
            <TabsTrigger
              key={prayer}
              value={prayer}
              className="transition-all duration-200 hover:scale-105 data-[state=active]:scale-110"
              style={{
                backgroundColor: prayerStatus[prayer] || "transparent",
                color: prayerStatus[prayer] === "yellow" ? "black" : 
                      prayerStatus[prayer] ? "white" : "black",
                fontWeight: "600",
                fontSize: "1rem"
              }}
              onClick={() => setSelectedPrayer(prayer)}
            >
              {prayer}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Dialog open={!!selectedPrayer} onOpenChange={() => setSelectedPrayer("")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPrayer} Status</DialogTitle>
          </DialogHeader>
          <div className="flex gap-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mb-4"
            />
            <div className="space-y-3">
              {statuses.map(({ label, color }) => (
                <Button
                  key={label}
                  className="w-full"
                  style={{ 
                    backgroundColor: color,
                    color: color === "yellow" ? "black" : "white",
                    fontWeight: "500"
                  }}
                  onClick={() => {
                    setPrayerStatus((prev) => ({
                      ...prev,
                      [selectedPrayer]: color,
                    }));
                    setSelectedPrayer("");
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prayer Statistics</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex justify-center gap-2">
              <Button 
                variant={statsPeriod === 'week' ? 'default' : 'outline'}
                onClick={() => setStatsPeriod('week')}
              >
                Week
              </Button>
              <Button 
                variant={statsPeriod === 'month' ? 'default' : 'outline'}
                onClick={() => setStatsPeriod('month')}
              >
                Month
              </Button>
              <Button 
                variant={statsPeriod === 'year' ? 'default' : 'outline'}
                onClick={() => setStatsPeriod('year')}
              >
                Year
              </Button>
              <Button 
                variant={statsPeriod === 'all' ? 'default' : 'outline'}
                onClick={() => setStatsPeriod('all')}
              >
                All Time
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(calculateStats()).map(([key, value]) => {
                if (!key.includes('Count')) return null;
                const label = key.replace('Count', '').split(/(?=[A-Z])/).join(' ');
                const percentage = calculateStats()[key.replace('Count', '') as keyof ReturnType<typeof calculateStats>];
                return (
                  <div key={key} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{label}</h3>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">{percentage}%</div>
                      <div className="text-sm text-gray-500">{value} times</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

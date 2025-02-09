
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const statuses = [
  { label: "Not Prayed", color: "black", textColor: "white" },
  { label: "Late", color: "red", textColor: "white" },
  { label: "On Time", color: "yellow", textColor: "black" },
  { label: "In Jamaah", color: "green", textColor: "white" },
];

export default function SalahTracker() {
  const [selectedPrayer, setSelectedPrayer] = useState("");
  const [prayerStatus, setPrayerStatus] = useState<Record<string, {color: string, date: string}>>({});
  
  // Reset prayers at midnight
  useEffect(() => {
    const today = new Date().toDateString();
    const checkDate = () => {
      const currentDate = new Date().toDateString();
      if (currentDate !== today) {
        setPrayerStatus({});
      }
    };
    
    const interval = setInterval(checkDate, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Salah Tracker - {new Date().toLocaleDateString()}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {prayers.map((prayer) => (
          <Button
            key={prayer}
            variant="outline"
            className="w-full h-20 flex flex-col items-center justify-center gap-1"
            style={{
              backgroundColor: prayerStatus[prayer]?.color || "transparent",
              color: prayerStatus[prayer]?.color === "yellow" ? "black" : "white",
            }}
            onClick={() => setSelectedPrayer(prayer)}
          >
            <span>{prayer}</span>
            {prayerStatus[prayer] && (
              <span className="text-xs">
                {statuses.find(s => s.color === prayerStatus[prayer].color)?.label}
              </span>
            )}
          </Button>
        ))}
      </div>

      <Dialog open={!!selectedPrayer} onOpenChange={() => setSelectedPrayer("")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPrayer} Status</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {statuses.map(({ label, color, textColor }) => (
              <Button
                key={label}
                className="w-full h-14"
                style={{ backgroundColor: color, color: textColor }}
                onClick={() => {
                  setPrayerStatus((prev) => ({
                    ...prev,
                    [selectedPrayer]: {
                      color,
                      date: new Date().toDateString()
                    }
                  }));
                  setSelectedPrayer("");
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

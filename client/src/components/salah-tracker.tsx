
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Salah Tracker</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {prayers.map((prayer) => (
          <Button
            key={prayer}
            variant="outline"
            className="w-full"
            style={{
              backgroundColor: prayerStatus[prayer] || "transparent",
              color: prayerStatus[prayer] ? "white" : "inherit",
            }}
            onClick={() => setSelectedPrayer(prayer)}
          >
            {prayer}
          </Button>
        ))}
      </div>

      <Dialog open={!!selectedPrayer} onOpenChange={() => setSelectedPrayer("")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPrayer} Status</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {statuses.map(({ label, color }) => (
              <Button
                key={label}
                className="w-full"
                style={{ backgroundColor: color }}
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

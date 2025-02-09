
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      <Tabs defaultValue="Fajr" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          {prayers.map((prayer) => (
            <TabsTrigger
              key={prayer}
              value={prayer}
              className="transition-all duration-200 hover:scale-105 data-[state=active]:scale-110"
              style={{
                backgroundColor: prayerStatus[prayer] || "transparent",
                color: prayerStatus[prayer] === "yellow" ? "black" : "white",
                fontWeight: "500"
              }}
            >
              {prayer}
            </TabsTrigger>
          ))}
        </TabsList>
        {prayers.map((prayer) => (
          <TabsContent key={prayer} value={prayer} className="mt-4">
            <Button
              className="w-full"
              onClick={() => setSelectedPrayer(prayer)}
            >
              How did you complete {prayer} today?
            </Button>
          </TabsContent>
        ))}
      </Tabs>

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
        </DialogContent>
      </Dialog>
    </div>
  );
}

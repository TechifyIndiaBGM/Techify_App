
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HadithSection() {
  const [hadith, setHadith] = useState({
    text: "Whoever fasts during Ramadan out of sincere faith and hoping to attain Allah's rewards, then all his past sins will be forgiven.",
    narrator: "Abu Huraira",
    source: "Sahih al-Bukhari"
  });

  const hadiths = [
    {
      text: "Whoever fasts during Ramadan out of sincere faith and hoping to attain Allah's rewards, then all his past sins will be forgiven.",
      narrator: "Abu Huraira",
      source: "Sahih al-Bukhari"
    },
    {
      text: "When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.",
      narrator: "Abu Huraira",
      source: "Sahih al-Bukhari"
    },
    {
      text: "Whoever stands (in prayer) in Ramadan out of faith and hoping for reward, his previous sins will be forgiven.",
      narrator: "Abu Huraira",
      source: "Sahih Muslim"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * hadiths.length);
      setHadith(hadiths[randomIndex]);
    }, 24 * 60 * 60 * 1000); // Change hadith every 24 hours

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Hadith of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg italic mb-4">{hadith.text}</p>
        <div className="text-sm text-muted-foreground">
          <p>Narrator: {hadith.narrator}</p>
          <p>Source: {hadith.source}</p>
        </div>
      </CardContent>
    </Card>
  );
}

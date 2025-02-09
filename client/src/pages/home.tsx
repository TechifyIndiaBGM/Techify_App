import { Card } from "@/components/ui/card";
import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";
import PriorityFilter from "@/components/priority-filter";
import { useState } from "react";

export default function Home() {
  const [priorityFilter, setPriorityFilter] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Tasks</h1>
        
        <Card className="p-6">
          <TaskForm />
        </Card>

        <div className="space-y-4">
          <PriorityFilter
            selected={priorityFilter}
            onChange={setPriorityFilter}
          />
          <TaskList priorityFilter={priorityFilter} />
        </div>
      </div>
    </div>
  );
}

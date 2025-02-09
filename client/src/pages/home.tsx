import { Card } from "@/components/ui/card";
import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";
import PriorityFilter from "@/components/priority-filter";
import { useState } from "react";
import SalahTracker from "@/components/salah-tracker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function Home() {
  const [priorityFilter, setPriorityFilter] = useState<number | null>(null);
  const [completionFilter, setCompletionFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <SalahTracker />
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full p-2 rounded border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <PriorityFilter
              selected={priorityFilter}
              onChange={setPriorityFilter}
              completionFilter={completionFilter}
              onCompletionChange={setCompletionFilter}
            />
          </div>
          <TaskList 
            priorityFilter={priorityFilter}
            completionFilter={completionFilter}
            searchQuery={searchQuery}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="fixed bottom-6 right-6 shadow-lg" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
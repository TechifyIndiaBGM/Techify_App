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
  const [showNewTask, setShowNewTask] = useState(false); // Added state for Create Task
  const [showStats, setShowStats] = useState(false);     // Added state for Stats/Report


  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <div className="space-y-4">
            <SalahTracker />
          </div>
        </section>
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold border-b-2 pb-2">To Do List</h2>
          </div>

          <div className="fixed bottom-6 right-6 flex flex-col gap-2 sm:flex-row">
            <Button 
              size="sm" 
              variant="outline"
              className="shadow-lg" 
              onClick={() => setShowStats(true)}
            >
              Stats/Report
            </Button>
            <Button 
              size="sm" 
              className="shadow-lg" 
              onClick={() => setIsDialogOpen(true)}
            >
              Create Task
            </Button>
          </div>
            <PriorityFilter
              selected={priorityFilter}
              onChange={setPriorityFilter}
              completionFilter={completionFilter}
              onCompletionChange={setCompletionFilter}
            />
          <TaskList 
            priorityFilter={priorityFilter}
            completionFilter={completionFilter}
            searchQuery={searchQuery}
          />
        </section>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {/*<Button className="fixed bottom-6 right-6 shadow-lg" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create Task
            </Button>*/}
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
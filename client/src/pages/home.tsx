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
  const [showStats, setShowStats] = useState(false);
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
    
    // For demonstration, showing some sample data
    const completedPrayers = Math.floor(totalPossiblePrayers * 0.8); // 80% completion rate
    const inJamaahCount = Math.floor(completedPrayers * 0.7);
    const onTimeCount = Math.floor(completedPrayers * 0.2);
    const lateCount = Math.floor(completedPrayers * 0.1);
    const notPrayedCount = totalPossiblePrayers - (inJamaahCount + onTimeCount + lateCount);
    
    return {
      inJamaah: Math.round((inJamaahCount / totalPossiblePrayers) * 100),
      onTime: Math.round((onTimeCount / totalPossiblePrayers) * 100),
      late: Math.round((lateCount / totalPossiblePrayers) * 100),
      notPrayed: Math.round((notPrayedCount / totalPossiblePrayers) * 100),
      inJamaahCount,
      onTimeCount,
      lateCount,
      notPrayedCount
    };
  };


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
            <Dialog open={showStats} onOpenChange={setShowStats}>
              <Button 
                size="sm" 
                variant="outline"
                className="shadow-lg" 
                onClick={() => setShowStats(true)}
              >
                Stats/Report
              </Button>
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
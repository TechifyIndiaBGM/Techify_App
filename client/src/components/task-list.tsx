import { useQuery } from "@tanstack/react-query";
import type { Task } from "@shared/schema";
import TaskCard from "./task-card";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskListProps {
  priorityFilter: number | null;
  completionFilter: 'all' | 'active' | 'completed';
  searchQuery: string;
}

export default function TaskList({ priorityFilter, completionFilter, searchQuery }: TaskListProps) {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const filteredTasks = tasks?.filter((task) => {
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    const matchesCompletion = 
      completionFilter === 'all' ? true :
      completionFilter === 'completed' ? task.completed :
      !task.completed;

    const matchesSearch = !searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesCompletion && matchesSearch;
  }).sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  if (!filteredTasks?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
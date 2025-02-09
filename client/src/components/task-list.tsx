import { useQuery } from "@tanstack/react-query";
import type { Task } from "@shared/schema";
import TaskCard from "./task-card";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskListProps {
  priorityFilter: number | null;
}

export default function TaskList({ priorityFilter }: TaskListProps) {
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

  const filteredTasks = tasks?.filter(
    (task) => !priorityFilter || task.priority === priorityFilter
  );

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

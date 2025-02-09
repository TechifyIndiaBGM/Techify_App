import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Task } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const priorityColors = {
  1: "bg-blue-100 text-blue-800",
  2: "bg-yellow-100 text-yellow-800",
  3: "bg-red-100 text-red-800",
};

const priorityLabels = {
  1: "Low",
  2: "Medium",
  3: "High",
};

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateTask = useMutation({
    mutationFn: async (updates: Partial<Task>) => {
      const res = await apiRequest("PATCH", `/api/tasks/${task.id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/tasks/${task.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Task deleted",
        description: "Your task has been deleted successfully.",
      });
    },
  });

  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={(checked) => {
            updateTask.mutate({ completed: checked === true });
          }}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
              {task.title}
            </h3>
            <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
              {priorityLabels[task.priority as keyof typeof priorityLabels]}
            </Badge>
          </div>
          
          {task.dueDate && (
            <p className="text-sm text-muted-foreground mt-1">
              Due: {format(new Date(task.dueDate), "PPP")}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTask.mutate()}
          disabled={deleteTask.isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

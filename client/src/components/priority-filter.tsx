import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const priorities = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
];

interface PriorityFilterProps {
  selected: number | null;
  onChange: (priority: number | null) => void;
  completionFilter: 'all' | 'active' | 'completed';
  onCompletionChange: (status: 'all' | 'active' | 'completed') => void;
}

export default function PriorityFilter({ 
  selected, 
  onChange,
  completionFilter,
  onCompletionChange
}: PriorityFilterProps) {
  return (
    <div className="space-y-4">
      <Tabs value={completionFilter} onValueChange={(value) => onCompletionChange(value as 'all' | 'active' | 'completed')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-2">
        <Button
          variant={selected === null ? "default" : "outline"}
          onClick={() => onChange(null)}
        >
          All Priorities
        </Button>
        {priorities.map((priority) => (
          <Button
            key={priority.value}
            variant={selected === priority.value ? "default" : "outline"}
            onClick={() => onChange(priority.value)}
          >
            {priority.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
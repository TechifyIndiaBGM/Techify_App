import { Button } from "@/components/ui/button";

const priorities = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
];

interface PriorityFilterProps {
  selected: number | null;
  onChange: (priority: number | null) => void;
}

export default function PriorityFilter({ selected, onChange }: PriorityFilterProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={selected === null ? "default" : "outline"}
        onClick={() => onChange(null)}
      >
        All
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
  );
}

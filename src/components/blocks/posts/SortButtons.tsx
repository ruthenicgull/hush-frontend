import { Button } from "@/components/ui/button";
import { History, TrendingUp } from "lucide-react";

type SortButtonsProps = {
  sort: string;
  onSortRecent: () => void;
  onSortVoted: () => void;
};

function SortButtons({ sort, onSortRecent, onSortVoted }: SortButtonsProps) {
  return (
    <div className="flex md:flex-col justify-center gap-2 w-full">
      <Button
        variant={sort === "recent" ? "default" : "secondary"}
        onClick={onSortRecent}
        className="flex gap-2"
      >
        <History size={16} /> Most Recent
      </Button>
      <Button
        variant={sort === "voted" ? "default" : "secondary"}
        onClick={onSortVoted}
        className="flex gap-2"
      >
        <TrendingUp size={16} /> Most Voted
      </Button>
    </div>
  );
}

export default SortButtons;

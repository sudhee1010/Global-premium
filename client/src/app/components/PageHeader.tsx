import { SlidersHorizontal, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useFilter } from "../contexts/FilterContext";
import { useState } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
}

export function PageHeader({ title, subtitle, showSearch = true }: PageHeaderProps) {
  const { toggleFilter } = useFilter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[140px] md:top-[132px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Search Bar - Desktop only */}
            {showSearch && (
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 h-10 w-64 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>
            )}

            {/* Filter Button */}
            <Button
              onClick={toggleFilter}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 h-10 px-4 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:bg-[#F7931A] hover:text-white hover:border-[#F7931A] dark:hover:bg-[#F7931A] dark:hover:border-[#F7931A] transition-all font-semibold shadow-sm"
            >
              <SlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


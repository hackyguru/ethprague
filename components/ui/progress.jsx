import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-600",
      className
    )}
    {...props}>
    <ProgressPrimitive.Indicator
      className={value>=50 ? "h-full w-full flex-1 bg-gradient-to-r from-green-500 to-[#e3f568] transition-all" : "h-full w-full flex-1 bg-gradient-to-r from-yellow-400 to-orange-600 transition-all"}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

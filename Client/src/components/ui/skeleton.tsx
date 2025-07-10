import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { cn } from "@/lib/utils"

// Enhanced skeleton components for common patterns
function SkeletonCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-white rounded-lg shadow-sm p-6", className)}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <Skeleton height={16} width={128} />
          <Skeleton height={12} width={96} />
        </div>
        <Skeleton height={32} width={32} circle />
      </div>
      <Skeleton height={32} width={96} className="mb-2" />
      <Skeleton height={12} width={64} />
    </div>
  )
}

function SkeletonTransaction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-white rounded-lg p-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton height={40} width={40} circle />
          <div className="space-y-2">
            <Skeleton height={16} width={128} />
            <Skeleton height={12} width={96} />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton height={20} width={80} />
          <Skeleton height={12} width={64} />
        </div>
      </div>
    </div>
  )
}

function SkeletonTable({ rows = 5, className, ...props }: { rows?: number } & React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg">
          <div className="flex items-center gap-3 flex-1">
            <Skeleton height={32} width={32} circle />
            <div className="space-y-2 flex-1">
              <Skeleton height={16} width="100%" style={{ maxWidth: '300px' }} />
              <Skeleton height={12} width={96} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton height={20} width={80} />
            <Skeleton height={32} width={32} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SkeletonStats({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)} {...props}>
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

// Skeleton Theme Provider for consistent styling
export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  return (
    <SkeletonTheme 
      baseColor="#f3f4f6" 
      highlightColor="#e5e7eb"
      borderRadius="0.5rem"
      duration={1.5}
    >
      {children}
    </SkeletonTheme>
  )
}

export { 
  Skeleton, 
  SkeletonCard, 
  SkeletonTransaction, 
  SkeletonTable, 
  SkeletonStats 
}

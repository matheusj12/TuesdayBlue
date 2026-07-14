import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  eyebrow?: string
}

export function PageHeader({ title, description, actions, eyebrow }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
    >
      <div>
        {eyebrow && (
          <span className="mb-1 block text-label-md font-semibold tracking-wide text-accent uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">{title}</h1>
        {description && <p className="mt-1.5 text-body-md text-text-secondary">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </motion.div>
  )
}

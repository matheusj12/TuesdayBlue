import { Fragment } from "react"

export function SimpleMarkdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/)

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.startsWith("```")) {
          const code = block.replace(/```\w*\n?/, "").replace(/```$/, "")
          return (
            <pre key={index} className="overflow-x-auto rounded-lg bg-black/30 p-4 text-xs text-text-secondary">
              <code>{code}</code>
            </pre>
          )
        }

        if (block.startsWith("## ")) {
          return (
            <h3 key={index} className="text-lg font-semibold text-text-primary">
              {block.replace("## ", "")}
            </h3>
          )
        }

        if (block.includes("|") && block.includes("---")) {
          const rows = block.split("\n").filter((r) => !r.includes("---"))
          return (
            <table key={index} className="w-full border-collapse text-sm">
              <tbody>
                {rows.map((row, rowIndex) => {
                  const cells = row.split("|").map((c) => c.trim()).filter(Boolean)
                  return (
                    <tr key={rowIndex} className="border-b border-border-subtle">
                      {cells.map((cell, cellIndex) => (
                        <Fragment key={cellIndex}>
                          {rowIndex === 0 ? (
                            <th className="px-3 py-2 text-left text-xs font-semibold text-text-secondary">
                              {cell}
                            </th>
                          ) : (
                            <td className="px-3 py-2 text-text-primary">{cell}</td>
                          )}
                        </Fragment>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        }

        return (
          <p key={index} className="text-sm leading-relaxed text-text-secondary">
            {block}
          </p>
        )
      })}
    </div>
  )
}

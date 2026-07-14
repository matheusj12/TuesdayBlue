import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, Send, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const suggestions = [
  "Summarize risks across active projects",
  "Which tasks are blocked right now?",
  "Draft a status update for Enterprise Platform Migration",
]

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi Alexander — I'm your workspace AI. Ask me about project health, blocked tasks, or ask me to draft an update.",
    },
  ])

  function send(content: string) {
    if (!content.trim()) return
    setMessages((prev) => [
      ...prev,
      { role: "user", content },
      {
        role: "assistant",
        content:
          "This is a UI preview — once connected to the TuesdayBlue API, I'll analyze live workspace data to answer that.",
      },
    ])
    setInput("")
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glow-button ambient-shadow fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full text-white"
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X className="size-5" /> : <Bot className="size-5" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="glass-panel ambient-shadow fixed right-6 bottom-24 z-50 flex h-[520px] w-[380px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-accent">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">TuesdayBlue AI</p>
                <p className="text-xs text-text-secondary">Workspace assistant</p>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "assistant"
                      ? "bg-white/5 text-text-primary"
                      : "ml-auto bg-primary text-white"
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 px-5 pb-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border-subtle px-2.5 py-1 text-xs text-text-secondary transition-colors hover:border-accent/30 hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-border-subtle p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything about your workspace..."
                className="h-9 flex-1 rounded-lg border border-border-subtle bg-background px-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none"
              />
              <Button type="submit" size="icon" className="size-9 shrink-0">
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { create } from 'zustand'
import type { ProviderId } from '@/lib/ai/types'

interface AppState {
  provider: ProviderId
  setProvider: (p: ProviderId) => void
  prompt: string
  setPrompt: (p: string) => void
  output: string
  appendOutput: (chunk: string) => void
  clearOutput: () => void
  isStreaming: boolean
  setStreaming: (s: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  provider: 'gemini',
  setProvider: (provider) => set({ provider }),
  prompt: '',
  setPrompt: (prompt) => set({ prompt }),
  output: '',
  appendOutput: (chunk) => set((s) => ({ output: s.output + chunk })),
  clearOutput: () => set({ output: '' }),
  isStreaming: false,
  setStreaming: (isStreaming) => set({ isStreaming }),
}))

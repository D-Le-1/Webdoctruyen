import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Truyen } from '../utils/type'

interface ReadState {
  readChaptersMap: Record<string, Set<string>>
  getReadChapters: (comicSlug: string) => Set<string>
  markAsRead: (comicSlug: string, chapterId: string) => void
  clearReadStatus: (comicSlug: string) => void
}

interface ReadTruyenStore {
  readTruyen: Truyen[]
  addTruyen: (truyen: Truyen) => void
}

export const useReadStore = create<ReadState>((set, get) => ({
  readChaptersMap: {},

  getReadChapters: (comicSlug) => {
    if (!comicSlug) {
      console.warn('Invalid comicSlug:', comicSlug) // Debug
      return new Set()
    }
    const map = get().readChaptersMap
    if (map[comicSlug]) {
      console.log('readChaptersMap data:', [...map[comicSlug]]) // Debug
      return map[comicSlug]
    }
    try {
      const stored = localStorage.getItem(`read_chapters_${comicSlug}`)
      console.log('localStorage data:', stored) // Debug
      if (stored) {
        const parsed: string[] = JSON.parse(stored)
        const validChapters = parsed.filter(
          (id) => id && typeof id === 'string' && id !== 'undefined'
        )
        console.log('Valid chapters:', validChapters) // Debug
        return new Set(validChapters)
      }
    } catch (e) {
      console.error('Error reading from localStorage:', e)
    }
    return new Set()
  },

  markAsRead: (comicSlug, chapterId) => {
    if (!comicSlug || !chapterId || chapterId === 'undefined') {
      console.warn('Invalid comicSlug or chapterId:', comicSlug, chapterId) // Debug
      return
    }
    set((state) => {
      const newMap = { ...state.readChaptersMap }
      const chaptersSet = newMap[comicSlug]
        ? new Set(newMap[comicSlug])
        : get().getReadChapters(comicSlug)
      if (chaptersSet.has(chapterId)) {
        console.log(
          `Chapter ${chapterId} already marked as read for ${comicSlug}`
        ) // Debug
        return state
      }
      chaptersSet.add(chapterId)
      newMap[comicSlug] = chaptersSet

      try {
        localStorage.setItem(
          `read_chapters_${comicSlug}`,
          JSON.stringify([...chaptersSet])
        )
      } catch (e) {
        console.error('Error saving read status:', e)
      }

      return { readChaptersMap: newMap }
    })
  },

  clearReadStatus: (comicSlug) => {
    if (!comicSlug) {
      console.warn('Invalid comicSlug:', comicSlug) // Debug
      return
    }
    set((state) => {
      const newMap = { ...state.readChaptersMap }
      delete newMap[comicSlug]

      try {
        localStorage.removeItem(`read_chapters_${comicSlug}`)
      } catch (e) {
        console.error('Error clearing read status:', e)
      }

      return { readChaptersMap: newMap }
    })
  }
}))

export const useReadTruyenStore = create(
  persist<ReadTruyenStore>(
    (set, get) => ({
      readTruyen: [],
      addTruyen: (truyen) => {
        const exists = get().readTruyen.find(
          (t) => String(t.id) === String(truyen.id)
        )
        if (!exists) {
          set((state) => ({
            readTruyen: [...state.readTruyen, truyen]
          }))
        }
      },
      removeTruyen: (id) => {
        set((state) => ({
          readTruyen: state.readTruyen.filter(
            (t) => String(t.id) !== String(id)
          )
        }))
      }
    }),
    {
      name: 'read-truyen-storage'
    }
  )
)

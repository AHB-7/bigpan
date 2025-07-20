import { useState, useEffect } from 'react'
import { FilterTagCategory, filterTagsService } from '@/services/filterTags'
import type { Database } from '@/types/supabase'

type FilterTag = Database['public']['Tables']['filter_tags']['Row']

export const useFilterTags = (category?: FilterTagCategory) => {
  const [tags, setTags] = useState<FilterTag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTags = async () => {
    setLoading(true)
    setError(null)

    const result = category
      ? await filterTagsService.getTagsByCategory(category)
      : await filterTagsService.getAllTags()

    if (result.error) {
      setError(result.error)
    } else {
      setTags(result.data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTags()
  }, [category])

  return { tags, loading, error, refetch: () => fetchTags() }
}

export const useFilterTagsGrouped = (categories: FilterTagCategory[]) => {
  const [tagsGrouped, setTagsGrouped] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true)
      setError(null)

      const result = await filterTagsService.getTagsByCategories(categories)

      if (result.error) {
        setError(result.error)
      } else {
        setTagsGrouped(result.data || {})
      }
      setLoading(false)
    }

    if (categories.length > 0) {
      fetchTags()
    }
  }, [categories])

  return { tagsGrouped, loading, error }
}

export const useUserSelectedTags = (tagIds: string[]) => {
  const [selectedTags, setSelectedTags] = useState<FilterTag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSelectedTags = async () => {
      if (!tagIds.length) {
        setSelectedTags([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      const result = await filterTagsService.getTagsByIds(tagIds)

      if (result.error) {
        setError(result.error)
      } else {
        setSelectedTags(result.data || [])
      }
      setLoading(false)
    }

    fetchSelectedTags()
  }, [tagIds])

  return { selectedTags, loading, error }
}

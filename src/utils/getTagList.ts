import { searchTags } from '@services/searchTags'

export async function getTagList () {
  const response: any = await searchTags()
  const tags = response.data.map((tag: any) => {
    return { label: tag.tagName, value: tag.tagName }
  })

  return tags
}

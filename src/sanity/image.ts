import {createImageUrlBuilder} from '@sanity/image-url'
import {client} from './client'

const builder = createImageUrlBuilder(client)

export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source)

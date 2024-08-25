import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'concert',
  title: 'Concert',
  type: 'document',
  icon: DocumentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your concert.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImageYTThumbnail',
      title: 'Cover Image YouTube Thumbnail',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'width',
          title: 'Width',
          type: 'number',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'height',
          title: 'Height',
          type: 'number',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
})

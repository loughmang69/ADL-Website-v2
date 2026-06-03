import { defineField, defineType } from "sanity";

/**
 * Author schema. The blog is currently single-author (Garrett) and the
 * AuthorBio component renders his static credentials, but this document type
 * exists so additional contributors can be added later without a schema change.
 */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title / Credentials",
      type: "string",
      description: "e.g. CPA, MBA",
    }),
    defineField({
      name: "image",
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "image" },
  },
});

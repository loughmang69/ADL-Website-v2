import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Company",
      type: "string",
      description: "e.g. Owner, Excel Cleaning, LLC",
    }),
    defineField({
      name: "stars",
      title: "Stars",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "text",
      title: "Testimonial",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: false,
      description: "Set to true to display on the site",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Pending first",
      name: "pendingFirst",
      by: [
        { field: "approved", direction: "asc" },
        { field: "submittedAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "approved" },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? "Approved" : "Pending Review",
      };
    },
  },
});

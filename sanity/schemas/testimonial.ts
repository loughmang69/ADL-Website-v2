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
      description: "e.g. Owner, Day Dreaming, Inc.",
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
    /**
     * Record of the display-consent checkbox at submission time. Read-only:
     * this is a record of what the submitter agreed to, not a setting to be
     * changed after the fact.
     *
     * Testimonials created before this field existed will read as unset rather
     * than false. Treat unset as "not recorded", not as "consent refused".
     */
    defineField({
      name: "permissionGranted",
      title: "Display Permission Granted",
      type: "boolean",
      readOnly: true,
      description:
        "Confirmed by the submitter at the time of submission. Unset on testimonials submitted before this was recorded.",
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

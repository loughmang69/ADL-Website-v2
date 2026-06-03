import type { SchemaTypeDefinition } from "sanity";
import { blogPost } from "./blogPost";
import { testimonial } from "./testimonial";
import { author } from "./author";

export const schemaTypes: SchemaTypeDefinition[] = [
  blogPost,
  testimonial,
  author,
];

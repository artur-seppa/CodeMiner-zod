import { z } from "zod";

export const createPostSchema = z.object({
    body: z
        .string()
        .min(1, "Body cannot be empty")
        .max(512, "Body must be at most 512 characters"),
    visibility: z.enum(["public", "private"], {
        message: "Visibility must be either 'public' or 'private'",
    }),
    authorId: z.string().uuid("Author ID must be a valid UUID"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const validateCreatePost = (post: unknown) => {
    const result = createPostSchema.safeParse(post);
    if (!result.success) {
        return { success: false, errors: result.error.format() };
    }
    return { success: true, data: result.data };
};
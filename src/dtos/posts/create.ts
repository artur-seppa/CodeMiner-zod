type VisibilityType = "public" | "private";

export interface CreatePostDto {
  visibility: VisibilityType;
  body: string;
  authorId: string;
}

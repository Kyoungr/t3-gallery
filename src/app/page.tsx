import Link from "next/link";
import { db } from "../server/db";

const mockUrls = [
  "https://utfs.io/f/PQH5dZBWrEM3Yr1cXKADqKgwdh2SGzO8Lx5BMEWPfcNX9lm6",
  "https://utfs.io/f/PQH5dZBWrEM3iIti1LXWDbP1o4GjHkOMALaQfsC96xvdNRSt",
  "https://utfs.io/f/PQH5dZBWrEM3M02ZYa6RO1u3Q4vIVgTzYZSj9dXCFDKikNsy",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const post = await db.query.posts.findMany();
  console.log("posts:", post);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {post.map((posts) => (
          <div key={posts.id}>{posts.name}</div>
        ))}
        {[...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
      Hello Gallery In progress
    </main>
  );
}

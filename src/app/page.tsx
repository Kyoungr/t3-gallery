import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/PQH5dZBWrEM3Yr1cXKADqKgwdh2SGzO8Lx5BMEWPfcNX9lm6",
  "https://utfs.io/f/PQH5dZBWrEM3iIti1LXWDbP1o4GjHkOMALaQfsC96xvdNRSt",
  "https://utfs.io/f/PQH5dZBWrEM3M02ZYa6RO1u3Q4vIVgTzYZSj9dXCFDKikNsy",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
      Hello Gallery In progress
    </main>
  );
}

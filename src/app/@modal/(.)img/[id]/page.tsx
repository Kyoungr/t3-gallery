export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  console.log("PhotoId", photoId);
  return <div>{photoId}</div>;
}

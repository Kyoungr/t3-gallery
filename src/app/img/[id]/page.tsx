import FullPageImageView from "~/common/full-image-page";

interface PhotoModalProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoModal({ params }: PhotoModalProps) {
  const { id } = await params;
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return <FullPageImageView id={idAsNumber} />;
}

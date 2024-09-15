import StreamView from "@/app/components/StreamView";

export default function CreatorList({
  params: { creatorId },
}: {
  params: {
    creatorId: string;
  };
}) {
  return (
    <div>
      {" "}
      <StreamView creatorId={creatorId} />{" "}
    </div>
  );
}

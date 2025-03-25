export default async function UpdatePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  return <div>UpdatePostPage</div>;
}

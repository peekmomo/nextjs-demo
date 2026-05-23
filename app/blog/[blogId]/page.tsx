
interface BlogProps {
    params: {
        blogId: string;
    }
}

export default async function BlogIdPage({ params }: BlogProps) {
    const { blogId } = await params;
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      blog id: {blogId}
    </div>
  );
}
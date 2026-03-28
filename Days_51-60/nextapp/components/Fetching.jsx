const Fetching = async () => {
  // const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();
  return (
    <>
      <h2 className="text-center font-bold text-2xl">Posts fetched from API</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {posts.map((post) => (
          <div key={post.id}>
            <h2>Title: {post.title}</h2>
            <h2>Author: {post.author}</h2>
            <h2>Date: {post.date}</h2>
            <h2>Category: {post.category}</h2>
            <p>Content: {post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Fetching;

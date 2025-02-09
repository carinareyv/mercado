

export default async function Home() {

  interface BoilerData {
   project_id : string,
   project_name: string
  }

  const data = await fetch('https://data.cityofnewyork.us/resource/hg8x-zxpr.json')
  const posts: BoilerData[] = await data.json()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
   <h1>HELLO</h1>
     <ul>
      {posts.map((post: BoilerData) => (
        <li key={post.project_id}>{post.project_name}</li>
      ))}
    </ul>
      
    </div>
  );
}

import Link from "next/link";

interface IMostReadNews {
  id: string | number
  title: string
}

const MostReads = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();

  const news: IMostReadNews[] = data.data;
  // console.log(news, "most read news")
  return (
    <div className="card p-2 bg-base-100 border-gray-300 border">
      <h1 className="font-bold text-lg">সর্বাধিক পঠিত</h1>

      <div className="grid gap-2 mt-2">
        {
          news.map((mostRead, ind) =>
            <Link key={mostRead.id} href={`/news/${mostRead.id}`}>
              <div
                className='flex  gap-2'
              >
                <p className='font-bold text-2xl text-red-500'>{ind + 1}</p>
                <h2>{mostRead.title}</h2>
              </div>
            </Link>
          )}
      </div>
    </div>
  );
};

export default MostReads;
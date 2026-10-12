import Image from 'next/image';
import Link from 'next/link';
interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}


const MainNews = ({ news }: { news: NewsItem[] }) => {
  const [firstNews, ...otherNews] = news;



  return (
    <div className='flex gap-2'>
      <Link href={`/news/${firstNews.id}`}>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <Image
              src={firstNews.imageUrl}
              alt='First news img'
              height={500}
              width={500} />
          </figure>
          <div className="card-body">
            <p className='text-red-500'>{firstNews.category}</p>
            <h2 className="card-title">{firstNews.title}</h2>
            <p>{firstNews.description}</p>

          </div>
        </div></Link>


      <div>
        {otherNews.slice(0, 4).map(newsItem => {


          return (
            <Link
              key={newsItem.id}
              href={`/news/${newsItem.id}`}
            >
              <div className="card bg-base-100 border border-gray-200 p-2">
                <p className="text-red-500">{newsItem.category}</p>
                <div>{newsItem.title}</div>
              </div>
            </Link>
          );
        })}
      </div>


    </div>
  );
};

export default MainNews;
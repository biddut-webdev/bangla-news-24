import Image from 'next/image';
import Link from 'next/link';

export interface NewsItem {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const NewsCard = ({ news }: { news: NewsItem }) => {
  // console.log(news, "newsid")
  return (
    <Link href={`/news/${news.id}`}>
      <div>
        <div className="card bg-base-100 shadow-sm">
          <figure>
            <Image
              src={news.imageUrl}
              alt='First news img'
              height={600}
              width={600} />
          </figure>
          <div className="card-body">
            <p className='text-red-500'>{news.category}</p>
            <h2 className="card-title">{news.title}</h2>
            <p>{news.description}</p>

          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
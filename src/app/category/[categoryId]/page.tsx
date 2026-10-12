import NewsCard from '@/components/NewsCard';

interface ICategory {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  imageAlt: string
}

const CategoryNews = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = await params;
  console.log(categoryId, 'category i')
  const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
  const data = await res.json();
  const categoryData: ICategory[] = data.data;


  return (
    <div>
      <h1 className='font-bold text-2xl text-red-700 m-5 border-b-2'>{data.title}</h1>

      <div className='grid grid-cols-3 gap-4'>
        {
          categoryData.map(cat => <NewsCard key={cat.id} news={cat} />)
        }
      </div>
    </div>
  );
};

export default CategoryNews;
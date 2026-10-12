import Image from 'next/image';

interface IBodyItem {
  type: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string | null;
  text?: string;
}

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
      cache: 'no-store',
    }
  );

  const data = await res.json();

  console.log(data, 'DETAIL API RESPONSE');

  const details = data.data;

  console.log(details, 'DETAILS');

  // API যদি কোনো article না দেয়
  if (!details) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-3">
          News not found
        </h1>

        <p className="text-gray-500">
          এই নিউজটির বিস্তারিত তথ্য পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight mb-4">
        {details.title}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-5">
        {details.text?.slice(0, 200)}
      </p>

      {/* Date & Source */}
      <div className="flex gap-3 text-sm text-gray-500 mb-5">
        <span>{details.source}</span>

        <span>•</span>

        <span>
          {details.firstPublished &&
            new Date(details.firstPublished).toLocaleDateString('bn-BD')}
        </span>
      </div>

      {/* Image source */}
      <p className="text-sm text-gray-500 mb-6">
        ছবি: {details.source}
      </p>

      {/* Full Article */}
      <article className="text-lg leading-8">

        {details.body?.map((item: IBodyItem, index: number) => {

          // Image
          if (item.type === 'image' && item.url) {
            return (
              <figure key={index} className="my-8">

                <Image
                  src={item.url}
                  alt={item.caption || details.title}
                  width={item.width || 800}
                  height={item.height || 450}
                  className="w-full h-auto rounded-lg"
                />

                {item.caption && (
                  <figcaption className="text-sm text-gray-500 mt-2">
                    {item.caption}
                  </figcaption>
                )}

              </figure>
            );
          }

          // Text
          if (item.text) {
            return (
              <p key={index} className="mb-5">
                {item.text}
              </p>
            );
          }

          return null;
        })}

      </article>

      {/* Tags */}
      {details.tags?.length > 0 && (
        <div className="border-t pt-4 mt-8">
          <p className="text-gray-500">
            {details.tags.join(', ')}
          </p>
        </div>
      )}

    </div>
  );
};

export default NewsDetails;
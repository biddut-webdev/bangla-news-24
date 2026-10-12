
interface IBodyItem {
  type: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string | null;
  text?: string;
}

interface INewsDetails {
  title: string;
  text?: string;
  source?: string;
  firstPublished?: string;
  body?: IBodyItem[];
  tags?: string[];
}

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  let details: INewsDetails | null = null;
  let hasError = false;

  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/article/${newsId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      hasError = true;
      console.error("News API status:", res.status);
    } else {
      const data = await res.json();
      details = data?.data ?? null;
    }
  } catch (error) {
    hasError = true;
    console.error("News API error:", error);
  }

  if (hasError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="mb-3 text-2xl font-bold">
          News unavailable
        </h1>
        <p className="text-gray-500">
          এই মুহূর্তে নিউজটি লোড করা যাচ্ছে না। পরে আবার চেষ্টা করুন।
        </p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="mb-3 text-2xl font-bold">
          News not found
        </h1>
        <p className="text-gray-500">
          এই নিউজটির বিস্তারিত তথ্য পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
        {details.title}
      </h1>

      {details.text && (
        <p className="mb-5 text-lg text-gray-600">
          {details.text.slice(0, 200)}
        </p>
      )}

      <div className="mb-5 flex flex-wrap gap-3 text-sm text-gray-500">
        {details.source && <span>{details.source}</span>}

        {details.firstPublished && (
          <>
            <span>•</span>
            <span>
              {new Date(details.firstPublished).toLocaleDateString("bn-BD")}
            </span>
          </>
        )}
      </div>

      <p className="mb-6 text-sm text-gray-500">
        ছবি: {details.source || "সংগৃহীত"}
      </p>

      <article className="text-lg leading-8">
        {details.body?.map((item, index) => {
          if (item.type === "image" && item.url) {
            return (
              <figure key={index} className="my-8">
                <img
                  src={item.url}
                  alt={item.caption || details.title}
                  width={item.width || 800}
                  height={item.height || 450}
                  className="h-auto w-full rounded-lg"
                  loading="lazy"
                />

                {item.caption && (
                  <figcaption className="mt-2 text-sm text-gray-500">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

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

      {details.tags && details.tags.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <p className="text-gray-500">
            {details.tags.join(", ")}
          </p>
        </div>
      )}
    </main>
  );
};

export default NewsDetails;

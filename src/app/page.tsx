import MainNews from "@/components/MainNews";
import Marque from "@/components/Marque";
import MostReads from "@/components/MostReads";
import NewsCard from "@/components/NewsCard";
interface IOtherSections {
  curationId: string;
  title: string;
  articles: {
    id: number | string
    title: string
    description: string;
    imageUrl: string;
    category: string;
  }[];
}


export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections: IOtherSections[] = data.data;
  // console.log(sections, "sections")

  const mainNews = sections[0].articles;
  const otherSections = sections.slice(1);
  // console.log(otherSections, "otherSections")


  return (
    <div >


      <div className="grid grid-cols-3 max-w-7xl mx-auto">
        {/* news section */}
        <div className="col-span-2 p-5">
          <MainNews news={mainNews} />

          <div className="grid gap-5 mt-5">
            {
              otherSections.map(section => <div className=" " key={section.curationId} >
                <h1 className="font-bold border-red-700 pb-1 border-b-2 ">{section.title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                  {
                    section.articles.map(news =>
                      <NewsCard key={news.id} news={news} />)
                  }
                </div>

              </div>)
            }
          </div>
        </div>

        {/* most read section */}
        <div className="col-span-1 p-5 ">
          <MostReads />
        </div>

      </div>
    </div>
  );
}

import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Headline {
  id: string
  title: string
  description: string
  link: string
  imageUrl: string
  imageAlt: string
  category: string
  type: string
  isLive: boolean
  firstPublished: string
  lastPublished: string
  source: string
}


const Marque = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  const data = await res.json();
  const headlines: Headline[] = data.data;

  return (
    <div className=" bg-red-700 text-white">

      <div className="max-w-7xl mx-auto flex">
        <div className=" bg-red-800 py-0.1 font-bold px-5">সর্বশেষ</div>
        <MarqueeText direction="right" duration={12} >
          {

            headlines.map(h => <span key={h.id}>
              <span>{h.title}</span>
              <span className='mx-5'>ㆍ</span>
            </span>)
          }
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marque;
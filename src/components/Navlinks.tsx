import Link from 'next/link';


interface NavlinksProps {
  slug: string
  title: string
  topicId: string | null
  url: string
  scrapable: boolean
}

const Navlinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories")
  const data = await res.json();
  const navs: NavlinksProps[] = data.data;
  const filterNavs = navs.filter(nav => nav.scrapable);
  return (
    <div className='container mx-auto flex justify-center items-center gap-8 py-2'>
      <Link href="/">হোম</Link>
      {
        filterNavs.map((nav, ind) => <Link key={ind}
          href={`/category/${nav.slug}`}>{nav.title}

        </Link>)}
    </div>
  );
};

export default Navlinks;
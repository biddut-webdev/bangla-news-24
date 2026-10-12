import Image from 'next/image';
import logo from '../../public/logo.webp'
import Navlinks from './Navlinks';
import Marque from './Marque';
import UserInfo from './UserInfo';
const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full"
  });

  return (
    <header>
      <div className='container mx-auto py-3 flex justify-between items-center'>
        <div className='container mx-auto flex justify-center items-center gap-2 w-full'>
          <div>
            <Image src={logo} alt="Logo" width={45} height={45} />
          </div>
          <div>
            <h2 className='font-bold text-red-700 text-2xl'>Bangla News 24</h2>
            <p className='text-sm'>{date}</p>
          </div>
        </div>
        <UserInfo />

      </div>
      <Navlinks />
      <Marque />
    </header>
  );
};

export default Header;
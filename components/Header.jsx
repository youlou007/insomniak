import Image from 'next/image';

const Header = () => {
  return (
    <div className="text-center py-8 relative z-10">
      <h1 className="text-4xl font-bold mb-4">Yacine et la Lune</h1>
      <div className="relative w-full h-40 mx-auto">
        <Image
          src="/images/title hand.png"
          alt="Main"
          width={300}
          height={160}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default Header; 
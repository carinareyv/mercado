import Image from "next/image";

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, imageUrl, onClick }) => {
  return (
    <div
      className="bg-[#E9E9E9] w-[164px] h-[162px] border border-black p-4 rounded-xl flex flex-col items-center justify-center text-[20px] cursor-pointer transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      <Image src={imageUrl} alt={name} width={47} height={47} className="mb-2" />
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
};

export default CategoryCard;

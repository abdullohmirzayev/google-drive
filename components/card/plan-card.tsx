interface PlanCardProps {
  name: string;
  description: string;
  price: string;
  options: string;
  priceId?: string;
}

const PlanCard = ({
  description,
  name,
  options,
  price,
  priceId,
}: PlanCardProps) => {
  return (
    <div className="border rounded-md p-4">
      <h1 className="text-center text-xl">{name}</h1>
      <div className="text-center mt-4 text-3xl">{description}</div>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extralight">
          {price !== "Free" && "$"}
          {price}
        </span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>
    </div>
  );
};

export default PlanCard;

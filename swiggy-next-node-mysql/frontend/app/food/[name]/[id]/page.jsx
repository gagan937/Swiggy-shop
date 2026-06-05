import FoodproductDetails from "../../../../src/pages/FoodproductDetails";

export default async function Page({ params }) {
  const { name, id } = await params;
  return <FoodproductDetails name={name} id={id} />;
}

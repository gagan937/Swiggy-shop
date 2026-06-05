import FoodDetail from "../../../src/pages/FoodDetail";

export default async function Page({ params }) {
  const { name } = await params;
  return <FoodDetail name={name} />;
}

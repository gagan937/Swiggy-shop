import ShopDetails from "../../../src/pages/ShopDetails";

export default async function Page({ params }) {
  const { name } = await params;
  return <ShopDetails name={name} />;
}

import ProductDetails from "../../../../src/pages/ProductDetails";

export default async function Page({ params }) {
  const { name, id } = await params;
  return <ProductDetails name={name} id={id} />;
}

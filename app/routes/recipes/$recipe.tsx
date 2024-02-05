import { useLoaderData } from "@remix-run/react";
import { recipes } from "./recipes";
import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export function loader({ params }: LoaderFunctionArgs) {
  invariant(params.recipeId, "Missing recipeId param");
  console.log(recipes.list);
  return recipes.list.find((item) => item.id === params.recipeId) ?? null;
}

export default function Test() {
  const recipe = useLoaderData<typeof loader>();
  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  return (
    <div>
      <h1>Title: {recipe.title}</h1>
      <p>Directions: {recipe.directions}</p>
      <p>Ingredients: {recipe.ingredients}</p>
    </div>
  );
}

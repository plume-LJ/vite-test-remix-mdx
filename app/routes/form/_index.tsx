import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node";
// import { useActionData } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);
  await new Promise((r) => setTimeout(r, 1000));
  return redirect("/form");

  // const errors = await validateRecipeFormData(formData);
  // if (errors) {
  //   return json({ errors });
  // }
  // const recipe = await db.recipes.create(formData);
  // return redirect(`/recipes/${recipe.id}`);
}

export default function Test() {
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

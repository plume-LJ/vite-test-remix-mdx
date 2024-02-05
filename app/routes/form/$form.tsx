import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
// import { redirect, } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node";
import {
  // Form,
  // useActionData,
  useFetcher,
  useNavigation,
} from "@remix-run/react";
("use client");

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);
  await new Promise((r) => setTimeout(r, 1000));
  return redirect("/form");
  return json(
    { errors: { username: "Username is required" } },
    { status: 400 },
  );
  if (Math.random()) {
    return json(
      { errors: { username: "Username is required" } },
      { status: 400 },
    );
  }

  // const errors = await validateRecipeFormData(formData);
  // if (errors) {
  //   return json({ errors });
  // }
  // const recipe = await db.recipes.create(formData);
  // return redirect(`/recipes/${recipe.id}`);
}

export default function ProfileForm() {
  const navigation = useNavigation();
  const feature = useFetcher();
  // console.log(feature);
  console.log(navigation);
  const isSubmitting = feature.formAction === "/form";
  console.log(isSubmitting);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    feature.submit(values, {
      method: "post",
      action: "/form",
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            // console.log(field);
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">
          {isSubmitting ? "Saving..." : "Create Form"}
        </Button>
      </form>
    </Form>
  );
}

// export function NewRecipe() {
//   const errors = useActionData<typeof action>()?.errors;
//   const navigation = useNavigation();
//   const isSubmitting = navigation.formAction === "/recipes/new";

//   return (
//     <Form method="post">
//       <label>
//         Title: <input name="title" />
//         {errors?.title ? <span>{errors.title}</span> : null}
//       </label>
//       <label>
//         Ingredients: <textarea name="ingredients" />
//         {errors?.ingredients ? (
//           <span>{errors.ingredients}</span>
//         ) : null}
//       </label>
//       <label>
//         Directions: <textarea name="directions" />
//         {errors?.directions ? (
//           <span>{errors.directions}</span>
//         ) : null}
//       </label>
//       <button type="submit">
//         {isSubmitting ? "Saving..." : "Create Recipe"}
//       </button>
//     </Form>
//   );
// }

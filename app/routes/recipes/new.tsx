import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { useFetcher } from "@remix-run/react";
import { recipes } from "./recipes";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";

import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  ingredients: z.string().min(1, { message: "Required" }),
  directions: z.string().min(1, { message: "Required" }),
  // ingredients: z.string({
  //   required_error: "Ingredients is required",
  // }).min(2),
  // directions: z.string({
  //   required_error: "Directions is required",
  // }).min(2),
});

const schema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Title must be at least 2 characters")
    .required("Title is required"),
  ingredients: yup.string().required(),
  directions: yup.string().required(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateRecipeFormData(formData: FormData) {
  console.log(formData);
  const title = formData.get("title");
  const ingredients = formData.get("ingredients");
  const directions = formData.get("directions");
  const errors: { [key: string]: string } = {};
  if (!title) {
    errors.title = "Title is required";
  }
  if (!ingredients) {
    errors.ingredients = "Ingredients are required";
  }
  if (!directions) {
    errors.directions = "Directions are required";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log(request);
  const formData = await request.formData();
  // console.log(formData);
  // const errors = await validateRecipeFormData(formData);
  // if (errors) {
  //   return json({ errors });
  // }
  await new Promise((r) => setTimeout(r, 1000));
  const recipe = await recipes.create(formData);
  // console.log(recipe);
  return redirect(`/recipes/${recipe.id}`);
}

export default function NewRecipe() {
  const feature = useFetcher();
  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      ingredients: "",
      directions: "",
    },
    mode: "onChange",
  });
  // const errors = useActionData<typeof action>()?.errors;
  // const navigation = useNavigation();
  const isSubmitting = feature.formAction === "/recipes/new";

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    feature.submit(values, {
      method: "post",
      action: "/recipes/new",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full">
          <FormField
            control={form.control}
            rules={{ required: true }}
            name="title"
            render={({ field }) => {
              // console.log(field);
              return (
                <FormItem className="w-1/2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormDescription>This is your public title.</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => {
              // console.log(field);
              return (
                <FormItem className="ml-8 w-1/2">
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Input placeholder="ingredients" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public ingredients.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="directions"
          render={({ field }) => {
            // console.log(field);
            return (
              <FormItem>
                <FormLabel>Directions</FormLabel>
                <FormControl>
                  <Input placeholder="directions" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public directions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {/* <Label>
          Title: <Input name="title" />
          {errors?.title ? <span>{errors.title}</span> : null}
        </Label>
        <label>
          Ingredients: <textarea name="ingredients" />
          {errors?.ingredients ? <span>{errors.ingredients}</span> : null}
        </label>
        <label>
          Directions: <textarea name="directions" />
          {errors?.directions ? <span>{errors.directions}</span> : null}
        </label> */}
        <Button type="submit">
          {isSubmitting ? "Saving..." : "Create Recipe"}
        </Button>
      </form>
    </Form>
  );
}

import { useLoaderData } from "@remix-run/react";
import { recipes } from "./recipes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
export function loader() {
  return recipes.list;
}

export default function Test() {
  const list = useLoaderData<typeof loader>();
  // const feature = useFetcher();
  return (
    <div>
      <h1>Test</h1>
      <Accordion
        type="single"
        collapsible
        className="mb-10 w-full p-10 pb-0 pt-10"
      >
        {list.map((item) => (
          <AccordionItem value={`item-${item.id}`} key={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <p>{item.directions}</p>
              <p>{item.ingredients}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <form>
        <Button variant="secondary" formAction="/recipes/new" type="submit">
          New Recipe
        </Button>
      </form>
    </div>
  );
}

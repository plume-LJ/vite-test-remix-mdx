// import { json } from "@remix-run/node";
import { useLoaderData, json } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Test", () => {
  it("use jsdom in this test file", () => {
    // console.log(json)
    const element = document.createElement("div");
    expect(element).not.toBeNull();
  });

  it("renders loader data", async () => {
    // ⚠️ This would usually be a component you import from your app code
    function MyComponent() {
      const data = useLoaderData() as { message: string };
      return <p>Message: {data.message}</p>;
    }

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: MyComponent,
        loader() {
          return json({ message: "hello" });
        },
      },
    ]);

    render(<RemixStub />);
    await screen.findByText("Message: hello");

    await waitFor(() => screen.findByText("Message: hello"));
  });
});

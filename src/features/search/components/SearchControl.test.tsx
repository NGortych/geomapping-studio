import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchControl } from "./SearchControl";

describe("SearchControl", () => {
  it("disables the search button while loading", () => {
    render(
      <SearchControl
        query="Warsaw"
        status={{ state: "loading" }}
        onQueryChange={jest.fn()}
        onSearch={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Search",
      }),
    ).toBeDisabled();
  });

  it("renders an error message and forwards user actions", async () => {
    const user = userEvent.setup();
    const onQueryChange = jest.fn();
    const onSearch = jest.fn();

    render(
      <SearchControl
        query="Bad input"
        status={{
          state: "error",
          message: "Please enter a valid search query.",
        }}
        onQueryChange={onQueryChange}
        onSearch={onSearch}
      />,
    );

    await user.type(screen.getByRole("textbox"), " updated");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(onQueryChange).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText("Please enter a valid search query."),
    ).toBeInTheDocument();
  });
});

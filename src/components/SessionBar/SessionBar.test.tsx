import { render } from "@testing-library/react";
import { SessionBar } from "./SessionBar";

describe("SessionBar component", () => {
  
  
    render(
    <SessionBar
      setUsersBarVisible={function (): void {
        throw new Error("Function not implemented.");
      }}
      usersBarVisible={false}
    />
  );
});

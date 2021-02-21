import * as React from "react";
import { Grid, GridProps, useToken } from "@chakra-ui/react";

export type AutoGridProps = GridProps & {
  minColWidth?: string;
};

export const AutoGrid = ({
  minColWidth = "xs",
  ...gridProps
}: AutoGridProps) => {
  const [width] = useToken("sizes", [minColWidth]);
  return (
    <Grid
      gap="8"
      gridTemplateColumns={`repeat(auto-fill, minmax(${width}, 1fr))`}
      {...gridProps}
    />
  );
};

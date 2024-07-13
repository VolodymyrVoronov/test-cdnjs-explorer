import { ComponentProps, memo } from "react";

import { cn } from "../lib/utils";

interface IPackageCardsProps extends ComponentProps<"div"> {}

const PackageCards = memo(
  ({ className, children, ...props }: IPackageCardsProps): JSX.Element => {
    return (
      <div
        className={cn(
          "grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export default PackageCards;

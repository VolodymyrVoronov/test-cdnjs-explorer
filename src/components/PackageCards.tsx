import { ComponentProps } from "react";

import { cn } from "../lib/utils";

interface IPackageCardsProps extends ComponentProps<"div"> {}

const PackageCards = ({
  className,
  children,
  ...props
}: IPackageCardsProps): JSX.Element => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PackageCards;

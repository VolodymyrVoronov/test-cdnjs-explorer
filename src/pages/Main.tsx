import { useIntersection } from "@mantine/hooks";
import { Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

import { PACKAGES_SHOWN } from "../constants/constants";
import { usePackages } from "../hooks/usePackages";
import { cn } from "../lib/utils";

import PackageCard from "../components/PackageCard";
import PackageCards from "../components/PackageCards";
import DotPattern from "../components/ui/dot-pattern";

const Main = (): JSX.Element => {
  const { isLoading, error, packageItems } = usePackages();

  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const [packagesShown, setPackagesShown] = useState(PACKAGES_SHOWN);

  useEffect(() => {
    if (
      entry?.isIntersecting &&
      packageItems?.total &&
      packagesShown < packageItems?.total
    ) {
      setPackagesShown((prev) => prev + PACKAGES_SHOWN);
    }
  }, [entry, packageItems?.total, packagesShown]);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return (
      <Spinner
        size="lg"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-auto p-5">
      <PackageCards>
        {packageItems?.results
          .slice(0, packagesShown)
          .map((item) => <PackageCard key={item.name} packageItem={item} />)}
      </PackageCards>

      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
        )}
      />

      <div ref={ref} />
    </div>
  );
};

export default Main;

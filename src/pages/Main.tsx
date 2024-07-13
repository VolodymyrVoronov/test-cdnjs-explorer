import { useIntersection, useDebouncedValue } from "@mantine/hooks";
import { Input, Spinner } from "@nextui-org/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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
  const [packageName, setPackageName] = useState<string>("");
  const [debouncedPackageName] = useDebouncedValue(packageName, 500);

  // useEffect(() => {
  //   if (
  //     entry?.isIntersecting &&
  //     packageItems?.total &&
  //     packagesShown < packageItems?.total
  //   ) {
  //     setPackagesShown((prev) => prev + PACKAGES_SHOWN);
  //   }
  // }, [entry, packageItems?.total, packagesShown]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setPackageName(value);
  };

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
    <div className="relative h-screen w-screen space-y-10 overflow-auto p-5">
      <Input
        value={packageName}
        onChange={onInputChange}
        onClear={() => setPackageName("")}
        isClearable
        type="text"
        label="Package name"
        variant="flat"
        size="lg"
        placeholder="Start typing package name..."
        className="z-20 m-auto w-full md:w-[75vw] lg:w-[50vw]"
      />

      <PackageCards>
        {packageItems?.results
          .slice(0, packagesShown)
          .filter((item) => item.name.includes(debouncedPackageName))
          .map((item) => (
            <PackageCard
              key={item.name}
              packageItem={item}
              searchedPackageQuery={debouncedPackageName}
            />
          ))}
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

import { useDebouncedValue } from "@mantine/hooks";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useKeyPress } from "ahooks";
import { ArrowDown } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { PACKAGES_SHOWN } from "../constants/constants";
import { usePackages } from "../hooks/usePackages";
import { cn } from "../lib/utils";

import PackageCard from "../components/PackageCard";
import PackageCards from "../components/PackageCards";
import DotPattern from "../components/ui/dot-pattern";

const Main = (): JSX.Element => {
  const { isLoading, error, packageItems } = usePackages();

  const [packagesShown, setPackagesShown] = useState(PACKAGES_SHOWN);
  const [packageName, setPackageName] = useState<string>("");
  const [debouncedPackageName] = useDebouncedValue(packageName, 500);

  useKeyPress("Esc", () => {
    if (packageName) {
      setPackageName("");
    }
  });

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

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setPackageName(value);
  };

  const onLoadMoreButtonClick = (): void => {
    setPackagesShown((prev) => prev + PACKAGES_SHOWN);
  };

  return (
    <div className="relative h-screen w-screen space-y-10 overflow-auto p-5">
      <div className="sticky top-0 z-30 rounded-xl py-2 backdrop-blur-xl backdrop-filter">
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
          className="m-auto w-full md:w-[75vw] lg:w-[50vw]"
        />
      </div>

      <PackageCards>
        {packageItems?.results
          .slice(
            0,
            debouncedPackageName !== "" ? packageItems?.total : packagesShown,
          )
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
          "fixed [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
        )}
      />

      {packagesShown < (packageItems?.total as number) &&
        debouncedPackageName === "" && (
          <div className="flex justify-center">
            <Button
              onClick={onLoadMoreButtonClick}
              type="button"
              color="primary"
              variant="shadow"
              endContent={<ArrowDown className="h-5 w-5" />}
            >
              Show more
            </Button>
          </div>
        )}
    </div>
  );
};

export default Main;

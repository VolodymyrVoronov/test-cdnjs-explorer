import { useClipboard } from "@mantine/hooks";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import { Check } from "lucide-react";

import { cn } from "../lib/utils";
import { IPackages } from "../types/types";

interface IPackageCardProps {
  packageItem: Extract<
    IPackages["results"][number],
    { name: string; latest: string }
  >;
}

const PackageCard = ({ packageItem }: IPackageCardProps): JSX.Element => {
  const clipboard = useClipboard({ timeout: 1000 });

  const onCopyButtonClick = (): void => {
    clipboard.copy(packageItem.latest);
  };

  return (
    <Card className="z-20" isHoverable>
      <CardHeader className="flex justify-center">
        <h1 className="text-xl font-semibold">{packageItem.name}</h1>
      </CardHeader>

      <Divider />

      <CardBody className="gap-3">
        <Button
          onClick={onCopyButtonClick}
          type="button"
          color="primary"
          variant="solid"
          className={cn({
            "bg-green-500": clipboard.copied,
          })}
        >
          {clipboard.copied ? (
            <div className="flex flex-row items-center gap-2">
              Copied <Check className="h-4 w-4" />
            </div>
          ) : (
            "Copy CDN link"
          )}
        </Button>

        <Button type="button" color="primary" variant="bordered">
          Explore
        </Button>
      </CardBody>
    </Card>
  );
};

export default PackageCard;

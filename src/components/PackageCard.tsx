import { useClipboard, useHover } from "@mantine/hooks";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import { Check } from "lucide-react";
import { memo } from "react";
import Highlighter from "react-highlight-words";

import { cn } from "../lib/utils";
import { IPackages } from "../types/types";

import Meteors from "./ui/meteors";

interface IPackageCardProps {
  packageItem: Extract<
    IPackages["results"][number],
    { name: string; latest: string }
  >;
  searchedPackageQuery?: string;
}

const PackageCard = memo(
  ({ packageItem, searchedPackageQuery }: IPackageCardProps): JSX.Element => {
    const clipboard = useClipboard({ timeout: 1000 });
    const { hovered, ref } = useHover();

    const onCopyButtonClick = (): void => {
      clipboard.copy(packageItem.latest);
    };

    return (
      <Card ref={ref} className="z-20" isHoverable>
        <CardHeader className="flex justify-center text-center">
          <Highlighter
            className="text-2xl font-semibold"
            searchWords={[searchedPackageQuery || ""]}
            autoEscape
            textToHighlight={packageItem.name}
          />
        </CardHeader>

        <Divider />

        <CardBody className="justify-end gap-3">
          <Tooltip content={packageItem.latest} color="secondary">
            <Button
              onClick={onCopyButtonClick}
              type="button"
              color="primary"
              variant="solid"
              size="sm"
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
          </Tooltip>

          <Button type="button" color="primary" variant="bordered" size="sm">
            Explore
          </Button>
        </CardBody>

        {hovered ? <Meteors number={30} /> : null}
      </Card>
    );
  },
);

export default PackageCard;

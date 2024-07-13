import { useHover } from "@mantine/hooks";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import { memo, useState } from "react";
import Highlighter from "react-highlight-words";

import { IPackages } from "../types/types";

import CopyButton from "./CopyButton";
import PackageDetails from "./PackageDetails";
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
    const { hovered, ref } = useHover();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onExploreButtonClick = (): void => {
      setIsModalOpen(true);
    };

    return (
      <>
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
            <CopyButton packageItem={packageItem} />

            <Button
              onClick={onExploreButtonClick}
              type="button"
              color="primary"
              variant="bordered"
              size="sm"
            >
              Explore
            </Button>
          </CardBody>

          {hovered ? <Meteors number={30} /> : null}
        </Card>

        <PackageDetails
          isModalOpen={isModalOpen}
          packageName={packageItem.name}
          onModalClose={() => setIsModalOpen(false)}
        />
      </>
    );
  },
);

export default PackageCard;

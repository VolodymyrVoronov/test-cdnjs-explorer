import { useClipboard } from "@mantine/hooks";
import { Button, ButtonProps, Tooltip } from "@nextui-org/react";
import { Check } from "lucide-react";

import { cn } from "../lib/utils";
import { IPackages } from "../types/types";

interface ICopyButtonProps extends ButtonProps {
  packageItem: Extract<
    IPackages["results"][number],
    { name: string; latest: string }
  >;
}

const CopyButton = ({
  packageItem,
  ...props
}: ICopyButtonProps): JSX.Element => {
  const clipboard = useClipboard({ timeout: 1000 });

  const onCopyButtonClick = (): void => {
    clipboard.copy(packageItem.latest);
  };

  return (
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
        {...props}
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
  );
};

export default CopyButton;

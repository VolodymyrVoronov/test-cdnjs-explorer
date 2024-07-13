import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/constants";
import { cn } from "../lib/utils";
import DotPattern from "../components/ui/dot-pattern";

const Start = (): JSX.Element => {
  const navigate = useNavigate();

  const onStartButtonClick = (): void => {
    navigate(ROUTES.MAIN);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <div className="relative z-20 flex flex-col items-center justify-center gap-10 text-center">
        <h1 className={cn("text-2xl text-slate-950 md:text-4xl")}>
          Explore packages with{" "}
          <span className="font-semibold text-primary">CDNJS</span>
        </h1>

        <Button
          onClick={onStartButtonClick}
          type="button"
          color="primary"
          variant="shadow"
          size="lg"
        >
          Explore
        </Button>
      </div>

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
    </div>
  );
};

export default Start;

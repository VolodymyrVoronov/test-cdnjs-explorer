import { Link } from "react-router-dom";

import { ROUTES } from "../constants/constants";

import Particles from "../components/ui/particles";

const ErrorPage = (): JSX.Element => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        404
      </span>

      <Link to={ROUTES.START} className="z-10 text-xl hover:text-blue-500">
        Back
      </Link>

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#000000"
        refresh
      />
    </div>
  );
};

export default ErrorPage;

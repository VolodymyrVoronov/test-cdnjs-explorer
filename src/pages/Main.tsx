import { usePackages } from "../hooks/usePackages";

const Main = (): JSX.Element => {
  const { isLoading, error, packageItems } = usePackages();

  console.log(packageItems);

  return <div>Main</div>;
};

export default Main;

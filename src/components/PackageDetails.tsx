import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button, Chip, Link, Spinner } from "@nextui-org/react";

import { usePackage } from "../hooks/usePackage";
import { formatGithubUrl } from "../lib/utils";
import CopyButton from "./CopyButton";

interface IPackageDetailsProps {
  isModalOpen: boolean;
  packageName: string;

  onModalClose: () => void;
}

const PackageDetails = ({
  isModalOpen = false,
  packageName,

  onModalClose,
}: IPackageDetailsProps): JSX.Element => {
  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: isModalOpen,
  });

  const { isLoading, error, packageItem } = usePackage(packageName);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onModalClose}
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            {error ? (
              <ModalHeader className="flex w-full flex-col justify-center gap-3">
                <div className="flex flex-row items-center gap-2">
                  Error:{" "}
                  <Chip color="danger" size="sm">
                    {error.message}
                  </Chip>
                </div>
              </ModalHeader>
            ) : !isLoading && !packageItem ? (
              <div>Package not found</div>
            ) : null}

            {isLoading ? (
              <Spinner size="lg" className="mt-10" />
            ) : (
              <>
                {!error && packageItem && (
                  <>
                    <ModalHeader className="flex flex-col gap-3">
                      <h1 className="flex flex-row items-center gap-2 text-2xl font-semibold">
                        {packageName}{" "}
                        <Chip color="primary" size="sm">
                          {packageItem?.version}
                        </Chip>
                      </h1>
                      <p className="text-md text-slate-500">
                        {packageItem?.description}
                      </p>
                    </ModalHeader>

                    <ModalBody>
                      {packageItem?.authors &&
                      packageItem?.authors.length > 0 ? (
                        <div className="space-y-1">
                          <span className="font-semibold text-slate-900">
                            Authors:
                          </span>
                          <ul>
                            {packageItem?.authors?.map((author) => (
                              <div key={author.name} className="space-y-1">
                                <li>{author.name}</li>
                                {author.email ? (
                                  <li>
                                    <Link href={`mailto:${author.email}`}>
                                      {author.email}
                                    </Link>
                                  </li>
                                ) : null}
                                {author.url ? (
                                  <li>
                                    <Link href={author.url} target="_blank">
                                      {author.url}
                                    </Link>
                                  </li>
                                ) : null}
                              </div>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {packageItem?.homepage ? (
                        <div className="flex flex-col space-y-1">
                          <span className="font-semibold text-slate-900">
                            Homepage:
                          </span>
                          <Link href={packageItem.homepage} target="_blank">
                            {packageItem.homepage}
                          </Link>
                        </div>
                      ) : null}

                      {packageItem?.repository ? (
                        <div className="flex flex-col space-y-1">
                          <span className="font-semibold text-slate-900">
                            Repository:
                          </span>
                          <Link
                            href={formatGithubUrl(packageItem.repository.url)}
                            target="_blank"
                          >
                            {formatGithubUrl(packageItem.repository.url)}
                          </Link>
                        </div>
                      ) : null}

                      {packageItem?.license ? (
                        <div className="flex flex-col space-y-1">
                          <span className="font-semibold text-slate-900">
                            License:
                          </span>
                          <p>{packageItem.license}</p>
                        </div>
                      ) : null}
                    </ModalBody>
                  </>
                )}
              </>
            )}

            <ModalFooter className="flex justify-between">
              {packageItem ? (
                <CopyButton packageItem={packageItem} size="md" />
              ) : null}

              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  onModalClose();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PackageDetails;

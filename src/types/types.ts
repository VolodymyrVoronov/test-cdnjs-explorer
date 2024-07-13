export interface IPackages {
  available: number;
  results: {
    latest: string;
    name: string;
  }[];
  total: number;
}

interface Author {
  name: string;
}

interface FileMap {
  basePath: string;
  files: string[];
}

interface AutoUpdate {
  source: string;
  target: string;
  fileMap: FileMap[];
  ignoreVersions: string[];
}

interface Repository {
  type: string;
  url: string;
}

interface Asset {
  version: string;
  files: string[];
  rawFiles: string[];
  sri: {
    [key: string]: string;
  };
}

export interface IPackage {
  name: string;
  latest: string;
  sri: string;
  authors: Author[];
  autoupdate: AutoUpdate;
  description: string;
  filename: string;
  homepage: string;
  keywords: string[];
  license: string;
  repository: Repository;
  version: string;
  author: string;
  assets: Asset[];
  versions: string[];
}

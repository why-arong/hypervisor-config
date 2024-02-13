import { createContext } from "react";
import { initialData } from "./data/initialData";

export const YamlContext = createContext<YamlContextData>({
  yamlData: initialData,
  setYamlData: () => {},
});

export interface YamlContextData {
  yamlData: {
    soc: string;
    revision: number;
    gic: {
      name: string;
      region: number[];
    };
    uart0: {
      name: string;
      region: number[];
      interrupt: number[];
    };
    vm0: {
      name: string;
      entry: number;
      cluster: number;
      core: number[][];
      memory: number[][];
      devices: {
        name: string;
        region: number[];
        interrupt?: number[];
      }[];
    };
    vm1: {
      name: string;
      entry: number;
      cluster: number;
      core: number[][];
      memory: number[][];
    };
    domains: {
      name: string;
      entry: number;
      cluster: number;
      core: number[][];
      memory: number[][];
      devices?: {
        name: string;
        region: number[];
        interrupt?: number[];
      }[];
    }[];
  };
  setYamlData: (yaml: any) => void;
}

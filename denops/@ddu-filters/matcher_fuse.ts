import type { Denops } from "jsr:@denops/core@^7.0.0";
import { BaseFilter } from "jsr:@shougo/ddu-vim@^10.0.0/filter";
import type { DduItem, SourceOptions } from "jsr:@shougo/ddu-vim@^10.0.0/types";
import Fuse, { type IFuseOptions } from "npm:fuse.js@^7.0.0";

type Params = {
  threshold: number;
};

export class Filter extends BaseFilter<Params> {
  filter(args: {
    denops: Denops;
    sourceOptions: SourceOptions;
    filterParams: Params;
    input: string;
    items: DduItem[];
  }): Promise<DduItem[]> {
    if (args.input == "") {
      return Promise.resolve(args.items);
    }

    const options: IFuseOptions<DduItem> = {
      ignoreLocation: true,
      includeMatches: true,
      isCaseSensitive: !args.sourceOptions.ignoreCase,
      keys: ["matcherKey"],
      shouldSort: true,
      threshold: args.filterParams.threshold,
    };

    const fuse = new Fuse<DduItem>(args.items, options);
    return Promise.resolve(fuse.search(args.input).map((r) => r.item));
  }

  params(): Params {
    return {
      threshold: 0.6,
    };
  }
}

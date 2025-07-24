import { Denops } from "https://deno.land/x/ddu_vim@v1.2.0/deps.ts";
import {
  BaseFilter,
  DduItem,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v1.2.0/types.ts";
// @deno-types="https://deno.land/x/fuse@v6.4.1/dist/fuse.d.ts";
import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.min.js";

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

    const options: Fuse.IFuseOptions<DduItem> = {
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

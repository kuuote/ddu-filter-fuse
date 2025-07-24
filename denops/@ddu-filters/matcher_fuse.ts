import {
  BaseFilter,
  type FilterArguments,
} from "jsr:@shougo/ddu-vim@^10.0.0/filter";
import type { DduItem } from "jsr:@shougo/ddu-vim@^10.0.0/types";
import Fuse, { type IFuseOptions } from "npm:fuse.js@^7.0.0";
import type {
  MatcherFuseItemData,
  MatcherFuseParams,
} from "../ddu-filter-fuse/types.ts";

/**
 * A Ddu Filter `matcher_fuse` that uses Fuse.js for fuzzy matching.
 */
export class Filter extends BaseFilter<MatcherFuseParams> {
  override filter(args: FilterArguments<MatcherFuseParams>): DduItem[] {
    if (args.input == "") {
      return args.items;
    }

    const options: IFuseOptions<DduItem> = {
      ignoreLocation: true,
      includeMatches: true,
      includeScore: true,
      isCaseSensitive: !args.sourceOptions.ignoreCase,
      keys: ["matcherKey"],
      shouldSort: false,
      threshold: args.filterParams.threshold,
    };

    const fuse = new Fuse<DduItem>(args.items, options);
    const items = fuse.search(args.input).map((result) => {
      const { item, score, matches } = result as Required<typeof result>;
      return {
        ...item,
        data: {
          ...item.data as Record<string, unknown>,
          matcher_fuse: {
            score,
            matches: matches.flatMap((m) => m.indices),
          },
        } satisfies MatcherFuseItemData,
      };
    });

    return items;
  }

  override params(): MatcherFuseParams {
    return {
      threshold: 0.6,
    };
  }
}

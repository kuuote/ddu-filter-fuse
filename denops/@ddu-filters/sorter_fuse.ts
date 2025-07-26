import { maybe } from "jsr:@core/unknownutil@^4.0.0";
import {
  BaseFilter,
  type FilterArguments,
} from "jsr:@shougo/ddu-vim@^10.0.0/filter";
import type { DduItem } from "jsr:@shougo/ddu-vim@^10.0.0/types";
import { isItemDataLike } from "../ddu-filter-fuse/predicate.ts";
import type { SorterFuseParams } from "../ddu-filter-fuse/types.ts";

const COMPLETE_MISMATCH_SCORE = 1;

/**
 * A Ddu Filter `sorter_fuse` that sorts items by the score from `matcher_fuse`.
 */
export class Filter extends BaseFilter<SorterFuseParams> {
  override filter(args: FilterArguments<SorterFuseParams>): DduItem[] {
    const scoreItems = args.items.map((item) => ({
      item,
      score: maybe(item.data, isItemDataLike)?.matcher_fuse.score ??
        COMPLETE_MISMATCH_SCORE,
    }));

    const sortedItems = scoreItems
      .toSorted((a, b) => a.score - b.score)
      .map(({ item }) => item);

    return sortedItems;
  }

  override params(): SorterFuseParams {
    return {};
  }
}

import { maybe } from "jsr:@core/unknownutil@^4.0.0";
import {
  BaseFilter,
  type FilterArguments,
} from "jsr:@shougo/ddu-vim@^10.0.0/filter";
import type { DduItem, ItemHighlight } from "jsr:@shougo/ddu-vim@^10.0.0/types";
import { Buffer } from "node:buffer";
import { isItemDataLike } from "../ddu-filter-fuse/predicate.ts";
import type { ConverterFuseHighlightParams } from "../ddu-filter-fuse/types.ts";

const MATCHED_HIGHLIGHT_NAME = "ddu-filter-filter_fuse_highlight-matched";

/**
 * A Ddu Filter `filter_fuse_highlight` that highlights matched text by matches
 * from `matcher_fuse`.
 */
export class Filter extends BaseFilter<ConverterFuseHighlightParams> {
  override filter(
    args: FilterArguments<ConverterFuseHighlightParams>,
  ): DduItem[] {
    const filteredItems = args.items.map((item) => {
      const matches = maybe(item.data, isItemDataLike)?.matcher_fuse.matches;
      if (!matches || matches.length === 0) {
        // Skips items that are not from matcher_fuse or have no matches.
        return item;
      }

      const display = item.display ?? item.word;
      if (item.matcherKey !== display) {
        // Skips items whose matcherKey is not the same as display.
        // This is to ensure that the highlights are applied to the correct text.
        return item;
      }

      const highlights = matches.map(([start, end]): ItemHighlight => ({
        name: MATCHED_HIGHLIGHT_NAME,
        hl_group: args.filterParams.highlightMatched,
        // `col` is 1-origin byte index
        col: 1 + Buffer.byteLength(display.slice(0, start)),
        // `width` is byte length
        width: Buffer.byteLength(display.slice(start, end + 1)),
      }));
      (item.highlights ??= []).push(...highlights);

      return item;
    });

    return filteredItems;
  }

  override params(): ConverterFuseHighlightParams {
    return {
      highlightMatched: "Search",
    };
  }
}

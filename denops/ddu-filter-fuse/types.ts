/**
 * Type definitions for the `matcher_fuse` Ddu filter.
 */
export type MatcherFuseParams = {
  /**
   * At what point does the match algorithm give up. A threshold of `0.0`
   * requires a perfect match (of both letters and location), a threshold of
   * `1.0` would match anything.
   *
   * @default 0.6
   * @see https://fusejs.io/api/options.html#threshold
   */
  threshold: number;
};

/**
 * Type definitions for the `sorter_fuse` Ddu filter.
 */
export type SorterFuseParams = Record<string, never>;

/**
 * Type definitions for the `converter_fuse_highlight` Ddu filter.
 */
export type ConverterFuseHighlightParams = {
  /**
   * The highlight group name to highlight matched text.
   *
   * @default "Search"
   */
  highlightMatched: string;
};

/**
 * Type definitions for the `matcher_fuse` Ddu item data.
 */
export interface MatcherFuseItemData {
  /**
   * A namespace for storing the matching results of `matcher_fuse`.
   */
  matcher_fuse: {
    /**
     * A score of `0` indicates a perfect match, while a score of `1` indicates
     * a complete mismatch.
     *
     * @see https://fusejs.io/api/options.html#includescore
     */
    score: number;

    /**
     * An array of match positions.
     */
    matches: Match[];
  };
}

/**
 * A match is a pair of indices representing the start and end positions.
 * Indexing starts from 0, and both `start` and `end` are inclusive.
 */
export type Match = [start: number, end: number];

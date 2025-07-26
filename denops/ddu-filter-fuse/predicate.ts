import { is, type Predicate } from "jsr:@core/unknownutil@^4.0.0";
import type { MatcherFuseItemData } from "./types.ts";

export const isItemDataLike = is.ObjectOf({
  matcher_fuse: is.Unknown,
}) as Predicate<MatcherFuseItemData>;

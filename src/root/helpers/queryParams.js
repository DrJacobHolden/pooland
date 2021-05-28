import {
  compose,
  concat,
  fromPairs,
  join,
  map,
  path,
  split,
  tail,
  toPairs,
} from "ramda";

const parseQueryParams = compose(
  fromPairs,
  map(compose(map(decodeURIComponent), split("="))),
  split("&"),
  tail
);

const constructQueryParams = compose(
  concat("?"),
  join("&"),
  map(join("=")),
  map(map(encodeURIComponent)),
  toPairs
);

const getQueryParam = (param) =>
  path([param], parseQueryParams(window.location.search));

export { constructQueryParams, getQueryParam, parseQueryParams };

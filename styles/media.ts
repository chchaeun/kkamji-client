import { css, CSSObject, SimpleInterpolation } from "styled-components";

type DeviceType = "large" | "medium";

const sizes: Record<DeviceType, number> = {
  large: 1200,
  medium: 1035,
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ) => css`
      @media (max-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<DeviceType, any>;

export { media };

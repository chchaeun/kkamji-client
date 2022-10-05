import { css, CSSObject, SimpleInterpolation } from "styled-components";

type DeviceType = "large" | "medium";

const sizes: Record<DeviceType, { max: number; min: number }> = {
  large: { max: 3000, min: 1600 },
  medium: { max: 1035, min: 0 },
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ) => css`
      @media (max-width: ${value.max}px) and (min-width: ${value.min}px) {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<DeviceType, any>;

export { media };

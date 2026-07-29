import { cva, type VariantProps } from "class-variance-authority";

const typography = cva([], {
  variants: {
    variant: {
      h2: "text-xl decoration-ring inline-block font-serif",
      paragraph: "text-muted-foreground font-normal block text-base font-sans",
    },
    size: {
      sm: "text-sm",
    },
    font: {
      sans: "font-sans",
      serif: "font-serif",
      heading: "font-heading",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});

export type ButtonVariants = VariantProps<typeof typography>;

export const typo = typography;

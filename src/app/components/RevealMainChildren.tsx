'use client';

import { Children, isValidElement, type ReactNode } from 'react';
import ScrollRevealFrom from './ScrollRevealFrom';

type RevealMainChildrenProps = {
  children: ReactNode;
};

/**
 * Wraps each main-column block so interior pages pop upward on scroll
 * the same way the homepage galleries do.
 */
export default function RevealMainChildren({ children }: RevealMainChildrenProps) {
  return (
    <>
      {Children.map(children, (child) => {
        if (child == null || typeof child === 'boolean') return child;
        if (!isValidElement(child)) return child;
        const props = child.props as Record<string, unknown> | null;
        if (props && 'data-no-reveal' in props) return child;
        return <ScrollRevealFrom from="up">{child}</ScrollRevealFrom>;
      })}
    </>
  );
}

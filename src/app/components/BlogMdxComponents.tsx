import Image from 'next/image';
import Link from 'next/link';
import { Children, isValidElement, type ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';

const paragraphClassName =
  'mt-5 font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg';

function isImageOnlyParagraph(children: ReactNode): boolean {
  const nodes = Children.toArray(children).filter(
    (node) => !(typeof node === 'string' && node.trim() === ''),
  );

  if (nodes.length !== 1 || !isValidElement(nodes[0])) return false;

  const child = nodes[0];
  if (child.type === 'img' || child.type === 'figure') return true;

  const props = child.props as { src?: unknown };
  return typeof props?.src === 'string' && props.src.length > 0;
}

export const blogMdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="blog-prose-h2 mt-12 font-display text-2xl font-medium text-cream-dark first:mt-0 dark:text-cream md:text-[1.75rem]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 font-display text-xl font-medium text-cream-dark dark:text-cream md:text-2xl"
      {...props}
    />
  ),
  p: ({ children, ...props }) => {
    if (isImageOnlyParagraph(children)) {
      return <>{children}</>;
    }

    return (
      <p className={paragraphClassName} {...props}>
        {children}
      </p>
    );
  },
  a: ({ href = '', ...props }) => {
    const isExternal = href.startsWith('http');
    const className =
      'font-medium text-coral underline decoration-coral/35 underline-offset-[3px] transition hover:text-coral-dark dark:text-[#e8b896] dark:hover:text-[#f2dcc4]';

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        />
      );
    }

    return <Link href={href} className={className} {...props} />;
  },
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-coral/45 pl-5 font-body text-base italic leading-[1.85] text-cream-dark/75 dark:border-[#c9a574]/50 dark:text-cream/72 sm:text-lg"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-10 border-0 border-t border-dashed border-[#cfc4b2]/80 dark:border-boho-stone/45" />
  ),
  strong: (props) => (
    <strong className="font-semibold text-cream-dark dark:text-cream" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;

    return (
      <figure className="lift-shadow my-10 overflow-hidden rounded-2xl bg-[#e8e3db] ring-1 ring-[#e8e3db] dark:bg-boho-bark dark:ring-boho-stone/35">
        <Image
          src={src}
          alt={alt ?? ''}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </figure>
    );
  },
};

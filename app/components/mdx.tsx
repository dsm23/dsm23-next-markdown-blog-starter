import { createElement } from "react";
import type {
  AnchorHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ImageProps } from "next/image";
import { highlight } from "sugar-high";

type Data = {
  headers: ReactNode[];
  rows: ReactNode[][];
};

const Table: FunctionComponent<{ data: Data }> = ({ data }) => {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const CustomLink: FunctionComponent<AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props,
) => {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const RoundedImage: FunctionComponent<ImageProps> = (props) => {
  return <Image className="rounded-lg" {...props} />;
};

const Code: FunctionComponent<
  Omit<HTMLAttributes<HTMLElement>, "children"> & {
    children: string;
  }
> = ({ children, ...props }) => {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
};

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number | string) {
  const Heading: FunctionComponent<
    Omit<HTMLAttributes<HTMLHeadingElement>, "children"> & {
      children: string;
    }
  > = ({ children }) => {
    const slug = slugify(children);

    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export const CustomMDX: FunctionComponent<MDXRemoteProps> = (props) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
};

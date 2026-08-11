"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogContentBlock } from "@/data/blogs";
import {
  isCallbackActionHref,
  useCallbackModal,
} from "@/components/layout/CallbackModalProvider";

type Props = {
  content: BlogContentBlock[];
};

function BlogActionLink({ href, text }: { href: string; text: string }) {
  const { openCallback } = useCallbackModal();

  if (isCallbackActionHref(href)) {
    return (
      <button
        type="button"
        onClick={openCallback}
        className="th-blog-action-link"
      >
        {text}
      </button>
    );
  }

  return <Link href={href}>{text}</Link>;
}

export function BlogContent({ content }: Props) {
  return (
    <div className="th-blog-prose">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "link":
            return (
              <p key={index}>
                <BlogActionLink href={block.href} text={block.text} />
              </p>
            );
          case "heading":
            return block.level === 2 ? (
              <h2 key={index}>{block.text}</h2>
            ) : (
              <h3 key={index}>{block.text}</h3>
            );
          case "quote":
            return (
              <blockquote key={index}>
                <p>{block.text}</p>
              </blockquote>
            );
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={index} className="th-blog-table-wrap">
                <table className="th-blog-table">
                  <thead>
                    <tr>
                      {block.headers.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "image":
            return (
              <figure key={index} className="th-blog-figure">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#f4f4f4]">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

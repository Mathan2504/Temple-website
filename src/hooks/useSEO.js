import { useEffect } from "react";

/**
 * Sets document title + meta description for the current page.
 * Primary Open Graph / Twitter tags live in index.html so link
 * previews (WhatsApp, Facebook) work without JS execution.
 */
export default function useSEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}

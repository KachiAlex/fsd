import Link from "next/link";
import { FileText, BookOpen, FolderOpen } from "lucide-react";
import type { Story, Publication, Project } from "@/lib/types";

interface RelatedItem {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _type: "story" | "publication" | "project";
}

interface RelatedContentProps {
  items: RelatedItem[];
}

const typeConfig = {
  story: { label: "Story", icon: BookOpen, path: "stories" },
  publication: { label: "Publication", icon: FileText, path: "publications" },
  project: { label: "Project", icon: FolderOpen, path: "projects" },
};

export default function RelatedContent({ items }: RelatedContentProps) {
  if (items.length === 0) return null;

  return (
    <section className="px-4 sm:px-10 py-12 sm:py-16 bg-off border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2">
          Related Content
        </div>
        <h2 className="font-serif text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold text-navy leading-tight mb-6">
          You may also be interested in
        </h2>
        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const config = typeConfig[item._type];
            const Icon = config.icon;

            return (
              <Link
                key={`${item._type}-${item.id}`}
                href={`/${config.path}/${item.slug}`}
                className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-mid transition-colors bg-white"
              >
                <div className="hidden sm:flex w-10 h-10 rounded-lg bg-off items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-muted" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm bg-navy text-white">
                    {config.label}
                  </span>
                  <h3
                    className="text-sm font-medium text-navy mt-1.5 mb-1 truncate"
                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                  />
                  <p className="text-xs text-muted leading-relaxed">
                    {item.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 140)}...
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

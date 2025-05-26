import Badge from "@components/atoms/Badge";
import LinkButton from "@components/atoms/LinkButton";
import React from "react";

interface PortfolioProjectProps {
  imgSrc: string;
  title: string;
  link: string;
  category: string;
  description?: string;
}

export default function PortfoliProject({
  link,
  imgSrc,
  title,
  category = "Web Development",
  description,
}: PortfolioProjectProps) {
  return (
    <section className="grid grid-cols-1 items-center gap-4 py-4 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-thin">{category}</p>
        <h2 className="md:text-4xl text-2xl font-medium">{title}</h2>
        <div className="text-gray-500 flex flex-wrap gap-2 text-sm">
          <Badge content="#NextJs" />
          <Badge content="#MongoDB" />
          <Badge content="#React" />
          <Badge content="#Typescript" />
          <Badge content="#Prisma" />
        </div>

        <p>{description}</p>

        <LinkButton href={link} title="View Project" ariaLabel="View Project" />
      </div>

      <div>
        <img src={imgSrc} className="rounded-md object-cover" alt={title} />
      </div>
    </section>
  );
}

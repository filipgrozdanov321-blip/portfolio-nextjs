import "./ProjectCard.css";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  route: string;
}

export default function ProjectCard({
  title,
  description,
  route,
}: ProjectCardProps) {
  return (
    <div className="project-card">
      <h2>{title}</h2>
      <p>{description}</p>

      <Link href={route}>
        <button>Check Project</button>
      </Link>
    </div>
  );
}

// trigger vercel rebuild
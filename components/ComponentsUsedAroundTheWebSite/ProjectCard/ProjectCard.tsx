import {Link} from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({title, description, route}) {
    return (
        <div className="project-card">
            <h2>{title}</h2>
            <p>{description}</p>
            
            <Link to={route}>
            <button>Check Project</button>
            </Link>
        </div>
    )
}
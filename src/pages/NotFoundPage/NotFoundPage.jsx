import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return <><p>Not found page</p><Link to="/">Go Home page</Link></>;
}

import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const styles = "text-sm text-blue-500 hover:text-blue-600 hover:underline";
  // const navigate = useNavigate();
  if (to === -1)
    return (
      <button onClick={() => navigate(-1)} className={styles}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  );
}

export default LinkButton;

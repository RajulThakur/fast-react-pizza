import { Link } from "react-router-dom";

function Button({ children, disabled, to, type = "primary", onClick = null }) {
  const baseStyle =
    "inline-block text-sm rounded-full bg-yellow-400 uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-yellow-300   focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed font-medium cursor-pointer ";

  const styles = {
    primary: baseStyle + "px-3 py-2 md:px-6 md:py-4",
    secondary:
      "inline-block text-xsm rounded-full border-2 border-stone-200  uppercase tracking-wider text-stone-400 transition-colors duration-300 hover:bg-zinc-200  hover:text-stone-500 focus:bg-stone-100 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed font-medium px-4 py-3 md:px-6 md:py-4 cursor-pointer",
    small: baseStyle + "px-3 py-2 md:px-5 md:py-2 text-xs ",
    round: baseStyle + "px-2.5 py-2.5 md:px-2.8 md:py-2.8 text-sm",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <div>
        <button className={styles[type]} onClick={onClick} disabled={disabled}>
          {children}
        </button>
      </div>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;

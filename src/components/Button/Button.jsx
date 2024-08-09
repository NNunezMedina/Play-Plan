import clsx from "clsx";
import s from "./Button.module.css";
import PropTypes from "prop-types";

function Button({ size = "md", variant = "primary", children, ...delegated }) {
  const classNames = clsx(s.button, s[variant], s[size]);

  return (
    <button className={classNames} {...delegated}>
      {children}
    </button>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "icon"]),
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  children: PropTypes.node.isRequired,
};

export default Button;

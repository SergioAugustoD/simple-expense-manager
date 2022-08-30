import './styles.scss'

const Button = (props) => {
  return (
    <button type='button' className={props.className}>{props.nameButton}</button>
  );
};
export default Button;
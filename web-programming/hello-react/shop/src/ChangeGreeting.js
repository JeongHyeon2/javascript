export default function ChangeGreeting(props) {
  return (
    <button type="button" onClick={props.handleClick}>
      Toggle Name
    </button>
  );
}

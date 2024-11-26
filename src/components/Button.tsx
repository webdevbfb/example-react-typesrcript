
interface Props {
  text: string;
  type: "big" | "small";
}

export default function Button({text, type}: Props) {
  return (
    <button className={"btn-" + type}>
        {text}
    </button>
  )
}

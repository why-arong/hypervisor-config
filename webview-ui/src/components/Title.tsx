interface titleProps {
  title: string;
}
export function Title({ title }: titleProps) {
  return <h1> {title} </h1>;
}

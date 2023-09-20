interface SearchProps {
  value: string;
  setValue: (e: string) => void;
}

export const Search = ({ value, setValue }: SearchProps) => {
  return (
    <input
      placeholder={"Search Images"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

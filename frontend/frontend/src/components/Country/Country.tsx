import "./Country.css";

type CountryProps = {
  name: string;
  citiesNumber: number;
  isSelected?: boolean;
  onClick: () => void;
};

export const Country = ({
  name,
  citiesNumber,
  isSelected,
  onClick,
}: CountryProps) => {
  const background = {
    backgroundColor: isSelected ? "yellow" : "transparent",
  };

  return (
    <button className="country" style={background} onClick={onClick}>
      {name} ({citiesNumber})
    </button>
  );
};

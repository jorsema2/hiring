type CityProps = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

export const City = ({ name }: CityProps) => {
  return <div>{name}</div>;
};

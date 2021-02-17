type Place = {
  id: number;
  location: string;
  start: Date;
  end?: Date;
  type: PlaceType;
};

enum PlaceType {
  School = "SCHOOL",
  Company = "COMPANY",
}

export { Place };

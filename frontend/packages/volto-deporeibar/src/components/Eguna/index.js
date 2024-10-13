export const Eguna = (props) => {
  const { date } = props;
  const dateObject = new Date(date);
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const now = `${dateObject.getFullYear()}-${month}-${dateObject
    .getDate()
    .toString()
    .padStart(2, '0')}`;

  return now;
};

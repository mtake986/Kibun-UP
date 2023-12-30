
type Props = {
  date: Date;
}

const CreatedDateString = ({date}: Props) => {
  return (
    <p>
      {date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()}
    </p>
  );
}

export default CreatedDateString
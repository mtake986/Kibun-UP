
type Props = {
  date: Date;
}

const CreatedDateString = ({date}: Props) => {
  return (
    <p>
      {date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()}
    </p>
  );
}

export default CreatedDateString
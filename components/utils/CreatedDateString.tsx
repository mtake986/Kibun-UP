
type Props = {
  date: Date;
}

const CreatedDateString = ({date}: Props) => {
  return (
    <p>
      {(date.getMonth() + 1) + '/' + date.getDate() + ', ' + date.getFullYear()}
    </p>
  );
}

export default CreatedDateString
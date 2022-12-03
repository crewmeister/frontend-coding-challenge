function Absences({ absences }) {
  return (
    <ol>
      {
        absences.map(absence => (<li>{ absence.id } - { absence.userId } - { absence.startDate } - { absence.endDate } - { absence.type }</li>))
      }
    </ol>
  );
};

export default Absences;
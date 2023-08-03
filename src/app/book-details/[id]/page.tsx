type BookDetailsType = {
  params: {
    id: string;
  };
};

function BookDetails({ params }: BookDetailsType) {
  return (
    <div>
      <h1>Book details</h1>
      <h2>{params.id}</h2>
    </div>
  );
}

export default BookDetails;

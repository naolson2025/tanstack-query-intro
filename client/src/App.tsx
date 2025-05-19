import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type Book = {
  id: number;
  title: string;
  author: string;
};

function App() {
  // const [books, setBooks] = useState<Book[]>([]);
  const [counter, setCounter] = useState(0);
  const { data, isLoading, error, isError } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: async () => {
      const resp = await fetch('/api/books');
      return resp.json();
    },
  });

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     const resp = await fetch('/api/books');
  //     const data = await resp.json();
  //     setBooks(data);
  //   };
  //   fetchBooks();
  // }, []);

  if (isLoading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center">
        <h1 className="text-4xl m-4">Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="p-20">
      <h1 className="flex justify-center text-4xl m-4">Book List</h1>
      <ul className="list bg-base-200 rounded-box shadow-md">
        {data?.map((book: Book) => (
          <li key={book.id} className="list-row">
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <button
          className="btn btn-primary mt-4"
          onClick={() => setCounter((prev) => prev + 1)}
        >
          Click me! {counter}
        </button>
      </div>
    </div>
  );
}

export default App;

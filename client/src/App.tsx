import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
};

function App() {
  const { data, isError, isLoading, error } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: async () => {
      const resp = await fetch('/api/books');
      if (!resp.ok) throw new Error('Failed to fetch books');
      return resp.json();
    },
  });
  // const [books, setBooks] = useState<Book[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setIsError(false);
  //   setError(null);
  //   const fetchBooks = async () => {
  //     let attempts = 0;
  //     let success = false;
  //     while (attempts < 3 && !success) {
  //       try {
  //         const resp = await fetch('/api/books');
  //         if (!resp.ok) {
  //           throw new Error('Failed to fetch books');
  //         }
  //         const data = await resp.json();
  //         setBooks(data);
  //         success = true;
  //       } catch (err) {
  //         attempts += 1;
  //         if (attempts === 3) {
  //           setIsError(true);
  //           setError(err instanceof Error ? err : new Error('Unknown error'));
  //         }
  //       }
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchBooks();
  // }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl text-primary"></span>
        <span className="text-2xl m-4">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center">
        <h1 className="text-4xl m-4">Error: {error?.message}</h1>
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
    </div>
  );
}

export default App;

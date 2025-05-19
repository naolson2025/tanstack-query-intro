import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

const route = app
  .use('/*', serveStatic({ root: './client/dist' }))
  .get('/api/books', (c) => {
    return c.json([
      { id: 1, title: '1984', author: 'George Orwell' },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { id: 3, title: 'The great Gatsby', author: 'F. Scott Fitzgerald' },
      { id: 4, title: 'The catcher in the Rye', author: 'J.D. Salinger' },
      { id: 5, title: 'Brave New World', author: 'Aldous Huxley' },
      { id: 6, title: 'Fahrenheit 451', author: 'Ray Bradbury' },
      { id: 7, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
      { id: 8, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    ]);
  });

export type AppType = typeof route;
export default app;

# snippet-manager

Snippet Manager is a simple web based tool to manage snippets of different kinds with the possibility to organize them using custom categorisations and filtering. An easy copy to clipboard functionality makes this a friendly tool to manage reusable information.

## Environment Variables

For the application to work, some env variables are necessary. Create a new `.env` file in the root directory and add following variables (adapt values to your secrets):

```
DATABASE_URL=abc123
DATABASE_TOKEN=abc123
JWT_SECRET=abc123
```

## Local Development

Start local development server by executing:

```bash
npm run dev
```

## Production Build

Create a production version by executing:

```bash
npm run build
```

The production build can be previewed with `npm run preview`.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, copy the `.env.local.example` file to `.env.local` and fill in the values.

The `TWITTER_TOKEN` is a bearer token that you can get from [Twitter's developer portal](https://developer.twitter.com/en/portal/dashboard).

![Bearer token button image](https://cdn.myusernamesth.is/mexA9/yUqIlOpA36.png/raw)

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

![UI view](https://cdn.myusernamesth.is/mexA9/CoruvUsE99.png/raw)

The UI should be fairly straightforward, but here's a quick rundown:

- Paste in the ID of a tweet you want to get retweets for in the text box.
- Click the "Pick a Winner" button.
- The winner will be displayed in the "Winner" section.
- To reroll, click the "Reroll" button. This will pick another winner without calling the server to get new data.
- To get new data, click the "Update tweet data" button. This will call the server to get new data and then pick a winner from the new data pool.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

import TwitterApi from 'twitter-api-v2';

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { tweetId } = req.body;
            console.log(tweetId);
            const client = new TwitterApi(process.env.TWITTER_TOKEN).v2.readOnly;
            let allUsers = [];
            let pageToken = undefined;
            do {
                const { data, meta } = await client.tweetRetweetedBy(tweetId, { max_results: 100, pagination_token: pageToken });
                if (data !== null)
                    allUsers = allUsers.concat(data);
                pageToken = meta?.next_token;
            } while (typeof pageToken === "string");
            console.log(allUsers, allUsers.length);
            res.status(200).json(allUsers);
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message ?? e });
        }
    }
    else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

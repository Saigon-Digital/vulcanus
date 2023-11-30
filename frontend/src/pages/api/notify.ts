import {NextApiRequest, NextApiResponse} from "next";
import {WebhookClient, EmbedBuilder} from "discord.js";

const webhook = new WebhookClient({
  url: process.env.DISCORD_WEBHOOK_URL as string,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const siteName = req.body.name;
  const state = req.body.state;
  const context = req.body.context;
  const reviewId = req.body.review_id;
  let previewContentSuffix = "";

  const author = req.body.committer
    ? {
        name: req.body.committer,
        iconURL: `https://github.com/${req.body.committer}.png`,
        url: `https://github.com/${req.body.committer}`,
      }
    : null;
  if (context === "deploy-preview" && reviewId) {
    previewContentSuffix = `  (deploy preview ${reviewId})`;
  }
  let content = "";
  if (state === "ready") {
    content = `Successful deploy of *${siteName}${previewContentSuffix}*`;
  } else if (state === "error") {
    content = `Deploy did not complete for *${siteName}${previewContentSuffix}*`;
  }
  let title = content;
  if (req.body.title) {
    title = req.body.title;
  } else if (req.body.commit_message) {
    title = req.body.commit_message;
  }
  const embed = new EmbedBuilder()
    .setColor(state === "ready" ? "#16a34a" : "#991b1b")
    .setTitle(title)
    .setURL(req.body.url)
    .setDescription(
      `Visit [build log](https://app.netlify.com/sites/${siteName}/deploys/${req.body.build_id})`
    )
    .addFields(
      {name: "Git branch", value: req.body.branch},
      {name: "Context", value: context}
    )
    .setTimestamp()
    .setAuthor(author);

  try {
    await webhook.client.send({
      username: "Deploy Notifier",
      embeds: [embed],
      content,
    });
    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send("Failed");
  }
}

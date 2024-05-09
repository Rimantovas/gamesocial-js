import { QuestWebhookType } from "./webhook_type";

export const NEWSLETTER_TASK_ID = "newsletter";

async function exampleWebhook(req: any, resp: any) {
  try {
    if (!(req.body.type in QuestWebhookType)) {
      console.error("Invalid webhook type", req.body.type);
      resp.status(200).send();
      return;
    }
    const type: QuestWebhookType = req.body.type;

    const participantId: string | undefined =
      req.body.payload.participant_id ?? req.body.payload.participant.id;
    if (!participantId) {
      resp.status(200).send();
      return;
    }
    console.log("Webhook received", type, participantId);
    switch (type) {
      case QuestWebhookType.task_completed:
        await handleTaskCompleted(
          req.body.payload.task.id,
          req.body.payload.participant.metadata.value
        );
        break;
      case QuestWebhookType.third_party_authenticated:
        await handleThirdPartyAuthenticated(
          participantId,
          req.body.payload.third_party_provider,
          req.body.payload.third_party_user.username
        );
        break;
      default:
        resp.status(200).send();
        return;
    }
    resp.status(200).send();
  } catch (e) {
    resp.status(501).send();
  }
}

async function handleTaskCompleted(taskId: string, email: string) {
  if (taskId === NEWSLETTER_TASK_ID) {
    console.log("Task completed", taskId, email);
  }
}

async function handleThirdPartyAuthenticated(
  participantId: string,
  provider: string,
  username?: string
) {
  console.log("Third party authenticated", participantId, provider, username);
}

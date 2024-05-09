import axios from "axios";
import { PutTaskManuallyRequest } from "./requests/put_task_manually_request";
import { CreateParticipantResponse } from "./responses/create_participant_response";

const REFERRAL_TASK_ID = "referral";
const API_URL = "API_URL";
const PRIVATE_API_KEY = "PRIVATE_API_KEY";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Api-Key": PRIVATE_API_KEY, "Api-Version": "1.0" },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle successful responses here
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createParticipant = async (
  identifier: string
): Promise<CreateParticipantResponse> => {
  const response = await api.post("/participants", { identifier });
  return response.data;
};

export const addQuestReferralCode = async (
  participantId: string
): Promise<void> => {
  const request: PutTaskManuallyRequest = {
    participant_id: participantId,
    status: "completed",
  };
  await api.put(`/tasks/${REFERRAL_TASK_ID}`, request);
};

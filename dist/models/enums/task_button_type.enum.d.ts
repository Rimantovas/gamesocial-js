export declare enum TaskButtonType {
    NO_PARTICIPANT = "NO_PARTICIPANT",// If not participant is found. Usually that means the user is not authenticated.
    START = "START",// If the task is not completed and the user is authenticated.
    CLAIM = "CLAIM",// If the task has been started and the user is authenticated.
    PENDING = "PENDING",// If the task is pending
    COMPLETED = "COMPLETED",// If the task is completed
    FAILED = "FAILED",// If the task has failed
    AUTH_REQUIRED = "AUTH_REQUIRED"
}

# Gamesocial React

**Gamesocial React** is a package that makes it easy to integrate Gamesocial into any React application. It provides all the necessary tools to create engaging missions for your users, simplifying the integration process and allowing you to focus on building an immersive experience.

## Quick start

1. **Install the package.** Start by installing the package using npm or yarn:

```sh
npm install gamesocial-react
# or
yarn install gamesocial-react
```

2. **Import provider.** Import the following provider:

```js
import { QuestsProvider } from "gamesocial-react";
```

3. **Set up the provider.** Wrap your application with the **QuestsProvider** to set up the context:

```js
const App = () => {
  return (
    <QuestsProvider
      apiKey={/* Your Gamesocial Public key */}
      apiUrl={/* The API url */}
      errorCallback={(error: string) {/* Optional error callback */}}
    >
      {/* Your App */}
    </QuestsProvider>
  );
};
```

4. **Use the hooks and wrapper components**. Now, you can use the provided hooks and components. For example, to list available missions, you can use the **useMissions** hook:

```js
import React from "react";
import { useMissions } from "gamesocial-react";

function MissionsList() {
  const { missions } = useMissions();

  return (
    <ul>
      {missions.map((mission) => (
        <li key={mission.id}>{mission.name}</li>
      ))}
    </ul>
  );
}

export default MissionsList;
```

5. **Explore more features.** Explore the other available hooks, components, and utilities provided by the package to fully utilize the functionality of **Gamesocial** in your React application.

## Hooks usage

**Gamesocial React** provides several useful hooks to help you manage missions and tasks within your React application. Below, we explore the available hooks and how to use them effectively:

### 1. useMissions

The **useMissions** hook provides access to the missions and their associated tasks in the Gamesocial platform. The hook is primarily used for reading data, allowing you to fetch available missions and their tasks.

Additionally, it provides a method to update the status of a task when it's completed, although this interaction is typically handled elsewhere.

**Hook Return**

1. **missions (IMission[]):**
   An array of mission objects.
2. **tasks (ITask[]):**
   An array of task objects associated with the missions.
3. **getTasksForMission ((missionId: string) => ITask[]):**
   A function that returns the list of tasks for a specific mission.
4. **updateTaskStatus ((taskId: string, status: ParticipantTaskStatus) => void):**
   A function to update the status of a task.
5. **maintenance (boolean):**
   A flag indicating whether the **Gamesocial** system is currently in maintenance mode. You should handle the UI accordingly if the flag is `true`

**Example Usage**

Here’s an example of how you can use the **useMissions** hook:

```js
import React from "react";
import { useMissions } from "gamesocial-react";

function MissionComponent() {
  const { missions, getTasksForMission, maintenance } = useMissions();

  if (maintenance) {
    return <p>The system is under maintenance. Please try again later.</p>;
  }

  return (
    <div>
      {missions.map((mission) => (
        <div key={mission.id}>
          <h2>{mission.name}</h2>
          <ul>
            {getTasksForMission(mission.id).map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MissionComponent;
```

### 2. useParticipant

The useParticipant hook provides access to information about the participant (the user) interacting with the tasks and missions on the Gamesocial platform. This hook is primarily used for displaying participant information, such as points earned, in the user interface. It also includes utility functions to check third-party authentication, adding points to local, and refetching participant.

**Hook Return**

1. **participant (IParticipant | undefined):**
   An object representing the participant, containing details like their points and authentication status.
2. **isThirdPartyAuthenticated ((thirdParty: ThirdPartyProvider) => boolean):**
   A function that checks if the participant is authenticated with a specified 3rd party provider. Check `ThirdPartyProvider` enum to find all supported 3rd party providers
3. **addPoints ((points: number) => void):**
   Add points to participant's score (only adds to local state)
4. **getParticipant (() => void):**
   A function that fetches the participant's data from the server. (initial fetch is handles automatically, use this if you want refresh state)

```js
import React from "react";
import { useParticipant } from "gamesocial-react";

function ParticipantInfo() {
  const { participant, addPoints, isThirdPartyAuthenticated } =
    useParticipant();

  if (!participant) {
    return <p>Authenticate</p>;
  }

  return (
    <div>
      <p>Points: {participant.points}</p>
      <p>
        Twitter Authenticated:{" "}
        {isThirdPartyAuthenticated("twitter") ? "Yes" : "No"}
      </p>
      <button onClick={() => addPoints(10)}>Add 10 Points</button>
    </div>
  );
}

export default ParticipantInfo;
```

## TaskWrapper

This is the main component. It is used for interaction with tasks. Wrap the `TaskWrapper` component around each task UI.

### Props

1. **task (ITask):**
   The task object representing the specific task being wrapped.
2. **participationDisabled (boolean):**
   A flag indicating whether task participation is disabled. Usually use the mission's `ends_at` field to check if the participation is available.
3. **maintenance (boolean):**
   A flag indicating whether the system is currently under maintenance. You should use the maintenance flag from useMissions unless you want some custom implementation.
   4, **callbacks (TaskCallbacks):**
   An object containing callback functions for specific task actions, such as viewing a YouTube video or uploading a file.
4. **errorCallback ((error: any) => void):**
   An optional callback function to handle errors that occur during task interaction.
5. **onSuccess (() => void):**
   An optional callback function called upon successful completion of a task.

### Below are explanations for all of the variables in children:

1. **onClick ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | undefined):**
   A function to handle clicks on the task link, typically triggering participation in the task.
2. **type (TaskButtonType):**
   This variable represents the type of button to be displayed in the child component, based on the task's participation status and user authentication status. Possible values include:
   - `NO_PARTICIPANT`: If not participant is found. Usually that means the user is not authenticated.
   - `START`: Indicates that the user can start the task.
   - `CLAIM`: Indicates that the user can claim he completed the task. This state comes after `START`.
   - `PENDING`: Indicates that the participation in the task is pending. Usually if the the task has to be manually approved.
   - `COMPLETED`: Indicates that the task has been completed.
   - `FAILED`: Indicates that the participation in the task has failed.
   - `AUTH_REQUIRED`: Indicates that 3rd party authentication is required to participate in the task. On click will take the the user to required OAuth screen.
3. **isLoading (boolean):**
   This variable indicates whether the child component is currently in a loading state.
4. **disabled (boolean):**
   This variable indicates whether the child component should be disabled. It is true if task participation is disabled, the system is under maintenance, or the task has been completed.
5. **comment (string | null | undefined):**
   Is only available if the the type is `FAILED`. Returns the error comment.

### Example

```js
import React from "react";
import { TaskWrapper, ITask } from "gamesocial-react";

function TaskCard({ task }: { task: ITask }) {
  return (
    <TaskWrapper
      task={task}
      participationDisabled={false}
      maintenance={false} // You should use the maintenance flag from useMissions hook
      callbacks={{
        // Replace this with an actual implementation
        onYoutubeView: async (task: ITask, videoId: string) => 0,
        onFileUpload: async (task: ITask) => "",
        onSubmitString: async (task: ITask) => "",
      }}
    >
      {({ onClick, type, isLoading, disabled, comment }) => {
        <button onClick={onClick}>{task.title}</button>;
      }}
    </TaskWrapper>
  );
}

export default TaskCard;
```

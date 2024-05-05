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

TODO

- Usage (Detail hooks)
- Task participation (Detail the component)
- API reference???

# ShockSoc Website

The website is built with the following stack:

Frontend:

- [Astro](https://astro.build/)
- [SolidJS](https://www.solidjs.com/)

Backend:

- [Firebase](https://firebase.google.com/) (access via ShockSoc's google account)
- [GitHub OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) (registered under ShockSoc's GitHub account)
- [GitHub Actions Workflow](https://docs.github.com/en/actions/using-workflows/about-workflows)

# Workflow

The workflow is triggered anytime an event is modified by an admin using the admin's OAuth token provided by GitHub (via the Firebase authentication flow). The token must contain the `repo` scope. Alternatively, the workflow can be triggered using the GitHub web interface.

# Adding administrators

Anyone can sign in using the GitHub OAuth API. For that reason, the database allows read/write operations only when performed by certain users. To add a new administrator:

- Make them log in [via the log-in page](https://shocksoc.org/login/) so that a user account is generated for them by the Firebase authentication flow.
- Visit the [Firebase users panel](https://console.firebase.google.com/u/0/project/website-storage-74225/authentication/users) and copy their unique identifier (found under the `User UID` column).
- Give them access to the database by adding their identity to the [`admins` object](https://console.firebase.google.com/u/0/project/website-storage-74225/database/website-storage-74225-default-rtdb/data/~2Fadmins). Note: It's a key:value pair. The only relevant information is the key which should be their UID. The value is for you to make sense of who's who.
- Give them access to the storage bucket by adding their identity to the [`admins` array](https://console.firebase.google.com/u/0/project/website-storage-74225/storage/website-storage-74225.appspot.com/rules) in the storage rules. This time you only need to add their UID.

# Images

All images should be uploaded in the right dimensions and `.webp` format.

# Committee

Text information about the committee should be added [here](https://console.firebase.google.com/u/0/project/website-storage-74225/database/website-storage-74225-default-rtdb/data/~2Fcommittee). Note: the expected form is:

```ts
Name: {
  bio: "Their Bio";
}
```

Their picture should be added [here](https://console.firebase.google.com/u/0/project/website-storage-74225/storage/website-storage-74225.appspot.com/files/~2Fcommittee).

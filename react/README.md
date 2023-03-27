# Getting Started with Create React App

This project was bootstrapped with [Create CE App](https://github.com/dorchaouat/dor-ce/tree/main/packages/create-ce-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode and served your files on [http://localhost:3300](http://localhost:3300)
In case you are starting the project for the first time, "Test Your App" flow will run and the site selector will be opened and you will be prompted to select a site to install your app on.

Once redirected to the site, please update the `LIVE_SITE_START_URL` and `EDITOR_START_URL` properties in this project's [`.env`](./.env) file.

If `LIVE_SITE_START_URL` and `EDITOR_START_URL` were configured - the flow will ask you to press the relevant key on keyboard to open chrome with live site or editor urls with local overrides. Then you can just start to develop the custom element widget in a production environment with HMR.

### `npm run build`

Builds the app for production to the [`dist/statics`](./dist/statics) folder.
The `build` command will do x things:

1. Compile `.ts` and `.tsx` files
2. Convert React component into a [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) using the [react-to-webcomponent](https://www.npmjs.com/package/react-to-webcomponent) library
3. Create a bundle file for each component the can be used as an entry point to the the app's Custom Element Component inside `dist/statics/scripts/component-name`
4. Compile `.scss` files and create a typed style module inside each component's auto-generated `Style.scss.d.ts` file
5. Fetch settings panel data from each component's [settings panel builder](https://devforum.wix.com/kb/en/article/create-a-custom-element-and-app-settings-panel#2-create-the-app-settings-panel) and create a typed object for it inside the component's auto-generated `.settings.type.ts` file

### `npm run add:component component-name`

Adds another Custom Element Component to your app both in the Develoepr Center and in this project's code.

## Learn More

You can read more about Cutom Element Component in Wix Apps here:
https://devforum.wix.com/kb/en/article/create-a-custom-element-and-app-settings-panel
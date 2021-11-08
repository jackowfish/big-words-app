# BIGWORDS

### Initalizing the repository:

1. First clone the repostory with `git clone https://github.com/jackowfish/big-words-app.git`
2. CD into the repository's folder: `cd big-words-app` 
3. Install neccessary packages and their depedencies with `npm install`
4. To launch the local version of the web-app, which has it's main file located at `./src/main.jsx`, run `npm run dev`
5. `npm build` compiles the React code to production files (HTML, CSS, JS)
6. To deploy the site, run firebase deploy
7. For testing purposes, we're using Cypress. To run `npx cypress open`

### Files & Directories:

* **src**:
  * **Components**: This folder holds individual React components
  * **Styles**: This folder holds CSS style sheets for React components
* **Static**:
  * This folder holds static images and objects used by React components
* **Cypress**:
  * This folder holds the Cypress tests we use to test the React code.

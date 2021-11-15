# BIGWORDS

## Big Words
[Big Words](https://jackowfish.github.io/big-words-site/) is a *wordometer* – a pedometer for words that could do for story time what FitBit did for walking. There are few, if any, applications that provide caregivers with the ability to track children’s books and words and naturally grow their vocabularies. Big Words aims to equip parents with the tools needed to prepare them to expose their children to language effectively.

## Files & Directories:

* **src**:
  * **Components**: This folder holds individual React components
  * **Styles**: This folder holds CSS style sheets for React components
* **Static**:
  * This folder holds static images and objects used by React components
* **Cypress**:
  * This folder holds the Cypress tests we use to test the React code.

## Getting Started
#### Prerequisites
- Node
- Firebase firetools 

#### Installing
1. First clone the repostory with `git clone https://github.com/jackowfish/big-words-app.git`
2. CD into the repository's folder: `cd big-words-app` 
3. Install neccessary packages and their depedencies with `npm install`

#### Running Locally
To launch the local version of the web-app, which has it's main file located at `./src/main.jsx`, run `npm run dev`

#### Warranty
These instructions were last verified by Lianna Goehring on 11/14/2021 on Windows and Mac OS.

## Testing
For testing purposes, we're using Cypress. To run, use `npx cypress open`

## Deployment
- `npm build` compiles the React code to production files (HTML, CSS, JS)
- To deploy the site, run firebase deploy

## Technologies Used
- Javascript, React.js, Firebase (Firebase Cloud Functions, Realtime Database, and Firebase Hosting)
- [Application Architecture](https://jackowfish.github.io/big-words-site/2021/10/03/Application-Architecture.html)
- [Architecture Diagram](https://drive.google.com/file/d/1xZ34oV8ZcmgT-18Jw9oZuGVB4lBdZqQu/view)

## Contributing
Before contributing to BigWords, new developers must have access to the following:
- Client Information
- [GitHub Repository](https://github.com/jackowfish/big-words-app)
- [Clickable Prototype](https://www.figma.com/files/team/1017564270614069136/BigWords?fuid=1017496868654503725)
- [Trello Board](https://trello.com/b/44ptFkKT/kanban-board)

## Authors
Jack Decker, Lianna Goehring, and Ashley Wortham

## License
Due to an IP agreement, we are awaiting client approval.

## Acknowledgements
We would like to thank Michelle Farmer and Dr. Jeff Terrell for their guidance on this project, as well as our client Jennifer Stone.

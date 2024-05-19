This repository contains a NestJS application for interacting with the LINE Messaging API.

Prerequisites
Node.js and npm (or yarn) installed on your system.
A LINE developer account and access to the LINE Messaging API documentation: https://developers.line.biz/
Installation
Clone this repository:

Bash
git clone https://your-github-repo-url.git
Use code with caution.
content_copy
Install dependencies:

Bash
cd your-project-directory
npm install
Use code with caution.
content_copy
Configuration
Create a .env file in the project root directory.

Add the following environment variables to the .env file, replacing the placeholders with your actual values:

LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
LINE_CHANNEL_SECRET=your_channel_secret
You can find your LINE_CHANNEL_ACCESS_TOKEN and LINE_CHANNEL_SECRET in the LINE Developers Console after creating a new LINE Messaging API channel.
Local Development with ngrok
Start the NestJS application:

Bash
npm run start:dev
Use code with caution.
content_copy
This will typically start the application on port 3000 by default.

Using ngrok:

Install ngrok if you haven't already: https://ngrok.com/

In a separate terminal window, run ngrok to create a public URL for your locally running application:

Bash
ngrok http 3000
Use code with caution.
content_copy
This will output a URL like https://<random-subdomain>.ngrok.io.

Configure the LINE Messaging API settings in the LINE Developers Console to use the public URL provided by ngrok for your webhook endpoint.

Note: The ngrok tunnel will be closed when you terminate the ngrok process.

Testing
Use the LINE Messaging API documentation or tools like LINE Notify to send messages to your LINE channel and test the functionality of your NestJS application.
Deployment
This project can be deployed to any platform that supports Node.js applications. You will need to update the configuration details (environment variables) to match your deployment environment. Remember to configure your webhook endpoint URL in the LINE Developers Console to point to your deployed application.

Contribution
Feel free to contribute to this project by creating pull requests. Make sure to follow the coding style and conventions used in the project.

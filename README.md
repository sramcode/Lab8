# Lab8_Starter

# Authors:
Sonika Ram and Angus Yick

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   (1)

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
    No. Unit testing is mainly used for individual aspects of the code. The message feature allows users to write and send messages, so we would need a seperate unit test for both writing and sending messages.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   Yes. Since unit testing is mainly used to tests individual aspects of the code, and the max message length is a inidivual feature, we are able to use unit testing.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   If "headless" is set to true, it will run the tests without a browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
    await page.click('header > img');
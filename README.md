# Sweeger

Sweeger is an open-sourced solution that allows you to become a better software engineer by ensuring you stay up-do-date with your favorite programming languages, frameworks and libraries, but also find new content that we feel you may be interested in! You will receive email feeds with new content (including articles, videos, etc.) related to your topics of choice

# Setup

(a full video demonstration of Sweeger is available at: [https://www.youtube.com/watch?v=026iMqe9JYU])

To run Sweeger, navigate to the `run` directory. Depending on if you are using a Windows- or Unix-based system, run either `windows.bat` or `unix.sh`. If asked to open another port, input _yes_. Sweeger should then open in your broswer:

[PICTURE]

To create an account, select "Sign Up" in the top right corner. You will now be on the "Sign Up" page (see below), where you can then enter your email and desired password. Secure authentication is achieved using Firebase.

[PICTURE]

After creating your account, you will have to verify your email address. Open the inbox for the email you used to register, and follow the link to verify your email. Then, return to Sweeger at (most likely at https://localhost:3001, but the port may be different) and you should be on the home page (see below).

[PICTURE]

Here, you can enter in the topics you would like to receive content for. The desired list of content should be in a comma-separated format, e.g. "C++,Java,Python". When you are ready, select "Get articles." This will invoke a web scraper, which will search for new content related to your interests. The scraper may take a few minutes to run, but within about 3-5 minutes, you should receive an email containing a variety of resources:

[PICTURE]

# Flowchart

![flowchart](https://github.com/AnshG714/sweeger/blob/master/rsc/flowchart.png?raw=true)

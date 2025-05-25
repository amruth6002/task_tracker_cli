# Task Tracker Command Line Interface Application :sparkles:

This project is built using JavaScript with no framework support. I have used the commander module for this project.

You can start by cloning this project to your local machine:
```sh
git clone https://github.com/amruth6002/task_tracker_cli.git
```

After cloning, in the command line, navigate to the directory where you cloned the code and run:
```sh
npm install -g .
```
The above command installs all the required dependencies globally.

You are all set to use the task tracker application from the command line. You can use the commands below:

**Adding a new task**
```sh
task-cli add "Buy groceries"
```

**Updating a task**
```sh
task-cli update 1 "Buy groceries and cook dinner"
```

**Deleting a task**
```sh
task-cli delete 1
```

**Marking a task as in progress**
```sh
task-cli mark-in-progress 1
```

**Marking a task as done**
```sh
task-cli mark-done 1
```

**Listing all tasks**
```sh
task-cli list
```

**Listing tasks by status**
```sh
task-cli list done
```
```sh
task-cli list todo
```
```sh
task-cli list in-progress
```

If you encounter an error where `index.js` opens in your editor instead of running, it may be because `task-cli.cmd` is not recognized as a Node.js script. To fix this, go to:
```
C:\Users\<YourUsername>\AppData\Roaming\npm
```
In this directory, find `task-cli.cmd` and ensure it runs with Node.js. If needed, add `node` before the script path in that file.
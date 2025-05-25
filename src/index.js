#!/usr/bin/env node
//A shebang is the special line at the very top of a script file that tells the operating system
//  which interpreter to use to run the script.

console.log('CLI started', process.argv);
const {Command} =require('commander');
const fs=require('fs');
const path=require('path');

const program = new Command();
const TASKS_FILE=path.join(__dirname,'tasks.json');

function loadtasks()
{
if(!fs.existsSync(TASKS_FILE))
{
    return [];
}
const data=fs.readFileSync(TASKS_FILE,'utf-8');
return JSON.parse(data);
}

function savetasks(tasks)
{
fs.writeFileSync(TASKS_FILE,JSON.stringify(tasks,null,2));
}

//adding task
program.command('add <description>')
       .description("Add a new task")
       .action((description)=>{
         const tasks=loadtasks();
         const newtask={
           id:tasks.length>0?tasks[tasks.length-1].id+1:1,
           description,
           status:'todo',
           createdAT:new Date().toISOString(),
           updatedAt:new Date().toISOString()
         };
         tasks.push(newtask);
         savetasks(tasks);
         console.log('Task added succesfully')
       });
//updating a existing task
program.command('update <id> <description>')
       .description("you can update existing task")
       .action((id,description)=>{
        const tasks=loadtasks();
            if(!description||description.length===0)
            {
              console.log("You didn't tell what to add man");
              return;
            }
            if(!id||id.length===0)
            {
              console.log("Enter the id,bro.");
              return;
            }
            const taskId=parseInt(id,10);
             const task=tasks.find(t=>t.id===taskId);//return objecct
             if(!task)
             {
               console.log("Task not found.");
               return;
             }
             task.description=description;
             task.updatedAt= new Date().toISOString();
             savetasks(tasks);
             console.log("Task upadted succesfully");
       });

//deleting task
program.command('delete <id>')
.description("You can delete a existing task")
.action((id)=>{
const tasks=loadtasks();
if(!id||id.length===0)
{
  console.log("Enter the id man");
  return;
}
const taskId=parseInt(id,10);
const task=tasks.findIndex(t=>t.id===taskId);
if(task===-1)
{
  console.log("Task not found");
  return;
}
tasks.splice(task,1);
savetasks(tasks);
console.log("Tasks deleted succesfully");
});

//updating the status
program.command("mark-in-progress <id>")
.description("updates the status of the task")
.action((id)=>{
const tasks=loadtasks();
if(!id||id.length===0)
{
  console.log("enter the id bro");
  return;
}
const taskid=parseInt(id,10);
const task=tasks.find((t)=>t.id===taskid);
if(!task)
{
  console.log("id not found");
  return;
}
task.status="in-progress";
savetasks(tasks);
console.log("status updated succesfully");
});
//updating the status
program.command("mark-done <id>")
.description("updates the status of the task")
.action((id)=>{
const tasks=loadtasks();
if(!id||id.length===0)
{
  console.log("enter the id bro");
  return;
}
const taskid=parseInt(id,10);
const task=tasks.find((t)=>t.id===taskid);
if(!task)
{
  console.log("id not found");
  return;
}
task.status="task-done";
savetasks(tasks);
console.log("status updated succesfully");
});

//listing all the tasks
program.command("list")
.description("listing all the tasks")
.action(() => {
  const tasks = loadtasks();
  for (const c of tasks)
  {
    console.log(`ID: ${c.id}\nDescription: ${c.description}\nStatus: ${c.status}\nCreated: ${c.createdAT}\nUpdated: ${c.updatedAt}\n`);
  }
});

//listing based on a particular status
program.command("listdone")
.description("listing all completed tasks")
.action(() => {
  const tasks = loadtasks();
  for (const c of tasks)
  {
    if(c.status==="task-done")
    {
   console.log(`ID: ${c.id}\nDescription: ${c.description}\nStatus: ${c.status}\nCreated: ${c.createdAT}\nUpdated: ${c.updatedAt}\n`);
    }
  }
});
program.command("listtodo")
.description("listing all todo tasks")
.action(() => {
  const tasks = loadtasks();
  for (const c of tasks)
  {
    if(c.status==="todo")
    {
   console.log(`ID: ${c.id}\nDescription: ${c.description}\nStatus: ${c.status}\nCreated: ${c.createdAT}\nUpdated: ${c.updatedAt}\n`);
    }
  }
});
program.command("listinprogress")
.description("listing all in-progress tasks")
.action(() => {
  const tasks = loadtasks();
  for (const c of tasks)
  {
    if(c.status==="in-progress")
    {
   console.log(`ID: ${c.id}\nDescription: ${c.description}\nStatus: ${c.status}\nCreated: ${c.createdAT}\nUpdated: ${c.updatedAt}\n`);
    }
  }
});

program.parse(process.argv)
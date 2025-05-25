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
             const task=tasks.find(t=>t.id===taskId);
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

program.parse(process.argv)
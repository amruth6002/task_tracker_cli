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
       .description('Add a new task')
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

program.parse(process.argv)
const inquirer = require('inquirer');
const inq = require('inquirer')
const fs = require('fs')
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inq.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?(Required)',
            validate: nameInput => {
                if(nameInput){
                    return true;
                }else {
                    console.log('Please enter your name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your github Username',
            validate: nameInput => {
                if(nameInput){
                    return true;
                }else {
                    console.log('Please enter your Username');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'would you like to enter some information about yourself?',
            default:true
        },
        {
            type: 'input',
            name:'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                }else {
                    return false;
                }
            }
        }
    ])
   
};

const promptProject = portfolioData => {
    console.log(`
    =================
    add a new project
    =================
    `);
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message:'What is the name of your project? (Required)',
            validate: nameInput => {
                if(nameInput){
                    return true;
                }else {
                    console.log('Please enter your project name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (required)',
            validate: nameInput => {
                if(nameInput){
                    return true;
                }else {
                    console.log('Please provide a description');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with?(check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'node']
        },
        {
            type:'input',
            name:'link',
            message:'Enter the github link to your project.(Required)',
            validate: nameInput => {
                if(nameInput){
                    return true;
                }else {
                    console.log('Please provide a github link');
                    return false;
                }
            }
        },
        {
            type:'confirm',
            name:'feature',
            message:'Would you like to feature this project?',
            default:false
        },
        {
            type:'confirm',
            name:'confirmAddProject',
            message:'Would you like to enter another project?',
            default:false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        }else {
            return portfolioData;
        }
    })
}

promptUser()
.then(promptProject)
.then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
       if(err) throw new error(err);

        console.log('Portfolio complete! Check out index.html to see the output!')
     });
})


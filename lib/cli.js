// import dependencies and classes
const inquirer = require ("inquirer")
const {
    Circle, Triangle, Square
} = require ("./shapes")
const SVG = require ("./svg")
const fs=require("fs")
// creates a list of questions for inquirer to ask
class cli {
    init (){
        return inquirer.prompt([
            {
                type:"list",
                name:"chosenShape",
                message:"What shape would you like your logo to be?",
                choices:["Circle","Square","Triangle"]
            },
            {
                type:"input",
                name:"shapeColor",
                message:"What color would you like the shape to be?"
            },
            {
                type:"input",
                name:"textContent",
                message:"What do you want the text to say? (No more than 3 characters)"
            },
            {
                type:"input",
                name:"textColor",
                message:"Choose a color for your font (different than shape color)"
            }
            // shows what to output according to choices from inquirer
        ]).then(data => {
            var chosenShape = ""
            if (data.chosenShape === "Circle"){
                chosenShape = new Circle()
            }
            else if (data.chosenShape === "Triangle"){
                chosenShape = new Triangle()
            }
            else {
                chosenShape = new Square()
            }
            chosenShape.setColor(data.shapeColor)
            var newLogo=new SVG()
            newLogo.setShape(chosenShape)
            newLogo.setText(data.textContent,data.textColor)
            return fs.writeFileSync("newLogo.svg",newLogo.render())
        })
    }
}
module.exports=cli
import { writeFile } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

//get path of the current file
const filePath = fileURLToPath(import.meta.url);
//get path of the folder which the file belongs to
const dirPath = dirname(filePath);

const content = "HelloWorld"; 

//if writing succeeds,error will be null.
writeFile(dirPath+"/file1/1.txt",content,error =>{
  if(error){
    console.log("write fails");
    console.log(error);
  }else{
    console.log("write succeeds");
  }

})

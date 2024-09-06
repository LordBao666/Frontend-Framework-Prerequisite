import {readFile} from "node:fs";
import { fileURLToPath } from "node:url";
import {dirname} from "node:path";

//get path of the current file
const filePath = fileURLToPath(import.meta.url);
//get path of the folder which the file belongs to 
const dirPath = dirname(filePath);


readFile(dirPath+"/file1/1.txt","utf-8",(error,data)=>{
  if(error){
    console.log("file reading fail");
    console.log(error);
  }else{
    console.log("file reading succeed");
    console.log(data);
  }
})
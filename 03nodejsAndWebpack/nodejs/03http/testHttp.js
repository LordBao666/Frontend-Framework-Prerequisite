import {createServer} from "http";

const server = createServer();

server.on("request",(req,res)=>{
  const url = req.url;
  let content = "<h1>403 NOT FOUND好好好</h1>";
  if (url === "/" || url === "/index.html") {
    content = "<h1>Welcome Page</h1>";
  } else if ( url === "/about.html") {
    content = "<h1>About Page</h1>";
  }

  // res.setHeader("Content-Type","text/html; charset=utf-8");
  // res.end(content);

  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(
    {
      name:"太白金星",
      age:10000
    }
  ));

})

server.listen(8888,()=>{});
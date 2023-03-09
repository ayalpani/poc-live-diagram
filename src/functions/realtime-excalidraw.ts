import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
let json = require("./live-status.excalidraw.template.json");

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  let jsonString = JSON.stringify(json);
  jsonString = jsonString.replace("{{Box#1}}", "Frontend");
  jsonString = jsonString.replace("{{Box#2}}", "Backend");
  jsonString = jsonString.replace(
    "{{Arrow#1}}",
    Math.ceil(Math.random() * 1000).toString()
  );
  jsonString = jsonString.replace(
    "{{Arrow#2}}",
    Math.ceil(Math.random() * 1000).toString()
  );

  return {
    statusCode: 200,
    body: jsonString,
  };
};

export { handler };

import * as fs from "fs";
import * as yaml from "js-yaml";

export class YmlRepository {

//   constructor() {}

  readFile(location: string) {
    const fileContent = fs.readFileSync(location, "utf-8");
    const ymlContent = yaml.load(fileContent) as any;
    return ymlContent;
  }
}

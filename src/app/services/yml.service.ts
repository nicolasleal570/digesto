import type { YmlRepository } from "../repositories/yml.repository.js";
import { ymlSchema } from "../schemas/yml.schema.js";

export class YmlService {
  private readonly fileLocation = `${process.cwd()}/backend/api.yml`;
  private readonly ymlRepository: YmlRepository;

  constructor(ymlRepository: YmlRepository) {
    this.ymlRepository = ymlRepository;
  }

  load() {
    const ymlContent = this.ymlRepository.readFile(this.fileLocation);
    const parsedYmlContent = ymlSchema.parse(ymlContent);

    console.log({ parsedYmlContent });

    return parsedYmlContent;
  }
}

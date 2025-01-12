import type { YmlRepository } from "../repositories/yml.repository.js";
import { YmlSchema, ymlSchema } from "../schemas/yml.schema.js";

export class YmlService {
  private readonly fileLocation = `${process.cwd()}/backend/api.yml`;
  private readonly ymlRepository: YmlRepository;
  private parsedYmlContent: YmlSchema | null = null;

  constructor(ymlRepository: YmlRepository) {
    this.ymlRepository = ymlRepository;
  }

  load({ force } = { force: true }) {
    if (!force && !!this.parsedYmlContent) {
      return this.parsedYmlContent;
    }

    const ymlContent = this.ymlRepository.readFile(this.fileLocation);
    const parsedYmlContent = ymlSchema.parse(ymlContent);
    this.parsedYmlContent = parsedYmlContent;

    return parsedYmlContent;
  }

  get parsedContent() {
    return this.parsedYmlContent;
  }
}

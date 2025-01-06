#!/usr/bin/env node

import { bootstrap } from "../index.js";

bootstrap().catch(() => {
  process.exit(1);
});

export async function getInput() {
  const filePath = Bun.argv[2];
  if (filePath) {
    return await Bun.file(filePath).text();
  }

  let didTimeout = false;
  let stdinResult = "";
  setTimeout(() => {
    if (!stdinResult) {
      didTimeout = true;
      console.error("No input was provided!");
      process.exit();
    }
  }, 500);
  for await (const chunk of Bun.stdin.stream()) {
    const chunkText = Buffer.from(chunk).toString();
    stdinResult += chunkText;
  }

  return stdinResult;
}

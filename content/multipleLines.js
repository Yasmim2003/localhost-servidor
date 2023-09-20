async function* makeTextFileLineIterator(fileURL) {
    const utf8Decoder = new TextDecoder("utf-8");
    const response = await fetch(fileURL);
    const reader = response.body.getReader();
    let { value: chunk, done: readerDone } = await reader.read();
    chunk = chunk ? utf8Decoder.decode(chunk) : "";
  
    const newline = /\r?\n/gm;
    let startIndex = 0;
    let result;
  
    while (true) {
      const result = newline.exec(chunk);
      if (!result) {
        if (readerDone) break;
        const remainder = chunk.substr(startIndex);
        ({ value: chunk, done: readerDone } = await reader.read());
        chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "");
        startIndex = newline.lastIndex = 0;
        continue;
      }
      yield chunk.substring(startIndex, result.index);
      startIndex = newline.lastIndex;
    }
  
    if (startIndex < chunk.length) {
      // Last line didn't end in a newline char
      yield chunk.substr(startIndex);
    }
  }
  
  async function run() {
    for await (const line of makeTextFileLineIterator('https://oraculo.cin.ufpe.br/alphaction/video')) {
      console.log(line)
    }
  }
  
  run();
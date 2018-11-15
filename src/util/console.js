function createMessage (message, componentInstance) {
  const componentInfo = componentInstance ? ' in "' + componentInstance.$options.name + '"' : '';
  return `[Rabotify] ${message}${componentInfo}`;
}

export function consoleWarn (message, componentInstance = null) {
  console.warn(createMessage(message, componentInstance));
}

export function consoleError (message, componentInstance = null) {
  console.error(createMessage(message, componentInstance));
}

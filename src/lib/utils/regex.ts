export const usernameRegex = /^[a-zA-Z0-9 öäüÖÄÜß#&\-]{1,20}$/; // escaping necessary otherwise error in client console
export const passwordRegex = /^.{8,}$/;
export const nameRegex = /^[a-zA-Z0-9 öäüÖÄÜß#&\-]{1,20}$/; // escaping necessary otherwise error in client console
export const titleRegex = /^[a-zA-Z0-9 öäüÖÄÜß#&\-]{1,20}$/; // escaping necessary otherwise error in client console
export const descriptionRegex = /^[a-zA-Z0-9 öäüÖÄÜß#&\-]{0,50}$/; // escaping necessary otherwise error in client console
export const contentRegex = /^[a-zA-Z0-9 öäüÖÄÜß#&\n\-]{1,1500}$/; // escaping necessary otherwise error in client console

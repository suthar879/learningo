export const speakText = (text: string, lang = "en-US") => {
  if (!("speechSynthesis" in window)) {
    alert("Text-to-speech not supported in this browser");
    return;
  }

  window.speechSynthesis.cancel(); // stop previous speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
};

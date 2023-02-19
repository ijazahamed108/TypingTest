import React, { useState, useRef, useEffect } from "react";

function TypingTest() {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const textareaRef = useRef();

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  const handleTextChange = (e) => {
    const { value } = e.target;
    setText(value);
    if (!typingStarted) {
      setTypingStarted(true);
      setIsRunning(true);
    }
    const words = value.trim().split(" ");
    setWordCount(words.length);
    if (value.trim() === text) {
      setIsRunning(false);
      setTypingFinished(true);
    }
  };

  const handleRestart = () => {
    setText("");
    setTimer(0);
    setWordCount(0);
    setIsRunning(false);
    setTypingStarted(false);
    setTypingFinished(false);
    textareaRef.current.focus();
  };

  return (
    <div className="typing-test">
      <h2>Type the following text:</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        ultricies, eros nec facilisis mollis, justo eros viverra ex, id faucibus
        massa nisl eget est. Sed sed est at elit suscipit rutrum vel vel elit.
        Praesent in urna sit amet nunc pretium volutpat. Sed vel odio at justo
        porttitor pharetra eget sed lectus.
      </p>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        disabled={typingFinished}
      ></textarea>
      <p>
        Time: {timer} seconds | Word count: {wordCount}
      </p>
      {typingFinished && <button onClick={handleRestart}>Restart</button>}
    </div>
  );
}

export default TypingTest;

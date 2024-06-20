// src/utils/highlight.ts
export const highlightText = (text: string, highlight: string): React.ReactNode => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{backgroundColor: 'yellow'}}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  
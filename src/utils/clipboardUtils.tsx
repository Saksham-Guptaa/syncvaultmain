export const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };
  
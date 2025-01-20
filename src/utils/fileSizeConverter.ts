const formatFromBytes = (size: number) => {
  const fileSize =
    size < 1000
      ? size + " B"
      : size >= 1000 && size < 1000000
        ? (size / 1000).toFixed(1) + " KB"
        : size >= 1000000 && size < 1000000000
          ? (size / 1000000).toFixed(1) + " MB"
          : (size / 1000000000).toFixed(1) + " GB";
  return fileSize;
};

export { formatFromBytes };

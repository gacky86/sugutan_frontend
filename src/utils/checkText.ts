export const checkText = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  maxLength: number
) => {
  const value = event.target.value;

  const isWithinMax = value.length <= maxLength;
  const correctedValue = isWithinMax ? value : value.slice(0, maxLength);

  return {
    lengthCheck: isWithinMax,
    input: correctedValue,
  };
};

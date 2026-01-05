export const logDev = (message: unknown) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message);
  }
};

export const log = (message: unknown) => {
  console.log(message);
};

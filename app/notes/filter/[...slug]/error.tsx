'use client';

interface ErrorProps {
  error: Error;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div>
      <p>Could not fetch the list of tasks. {error.message}</p>;
    </div>
  );
};

export default Error;

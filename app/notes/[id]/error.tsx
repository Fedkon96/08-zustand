'use client';

interface ErrorProps {
  error: Error;
}

const error = ({ error }: ErrorProps) => {
  return (
    <div>
      <p>
        Something went wrong. Try again! More details about the error :
        {error.message}
      </p>
    </div>
  );
};

export default error;

const Loader = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:.7s]" />
      <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:.3s]" />
      <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:.7s]" />
    </div>
  );
}

export default Loader;
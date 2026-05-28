const Title = ({ section, title, description }) => {
  return (
    <div className="text-center">
      <span className="text-xs text-zinc-900 bg-slate-200 rounded-full px-6 py-2">
        {section}
      </span>
      <h1 className="text-4xl md:text-[40px] font-medium text-zinc-900 mt-6">
        {title}
      </h1>
      <p className="text-base text-zinc-600 max-w-md mx-auto mt-3">
        {description}
      </p>
    </div>
  );
};

export default Title;

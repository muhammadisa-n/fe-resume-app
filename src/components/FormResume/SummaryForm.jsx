function SummaryForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-600">Summary</h3>
      <p className="text-sm text-gray-400">
        Get Started with personal information
      </p>
      {/* form */}
      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-violet-500 outline-none transition-colors resize-none"
          placeholder="Enter your proffesional summary..."
        ></textarea>
      </div>
    </div>
  );
}

export default SummaryForm;

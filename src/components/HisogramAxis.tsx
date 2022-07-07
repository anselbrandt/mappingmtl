interface HisogramAxisProps {
  values: string[];
}

const HistogramAxis: React.FC<HisogramAxisProps> = ({ values }) => {
  return (
    <div className="flex justify-between">
      {values.map((value, index) => (
        <div key={index}>{value}</div>
      ))}
    </div>
  );
};

export default HistogramAxis;

const { useState } = React;

function EditableTable() {
  const initialData = [
    "Onboarding Call",
    "Google Search Console Access",
    "Google Analytics Access",
    "Website Access",
    "Technical Audit",
    "Anchor Text and Semantic Analysis",
    "Competitor Analysis",
    "Anchor Text / URL Mapping",
    "Google Data Studio Report + Local Reporting Suite",
    "Site Level Optimization",
    "On Page Optimization",
    "Content Creation",
    "Content Publishing",
    "Premium Press Release",
    "Authority Niche Placements",
    "Review Management",
    "Index Links",
    "Video Recap",
  ];

  const [rows, setRows] = useState(initialData.map((item) => ({ task: item })));

  const handleChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].task = value;
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    const postData = rows.map((row) => ({ task: row.task }));
    console.log("Ready to post:", JSON.stringify(postData, null, 2));
    alert("Check console for JSON payload ready to post to API.");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>MONTH 1</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.task}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<EditableTable />);

'use client'
import React from 'react';

// Sample row data to simulate the actual rows
const rows = [
  { id: 'e9bc9d92-e194-4409-8694-38d7e99543f1', name: 'Item 1' },
  { id: '6554f1af-e4ad-4428-b780-c1bdcf4fb23f', name: 'Item 2' },
  { id: '77fc3dcb-5933-4690-b068-12b4ed6c3197', name: 'Item 3' },
  { id: '32ee935f-9ef5-4ea4-94ae-5d980760f993', name: 'Item 4' },
];

const MyComponent = () => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleCheck = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setSelected(prevSelected => {
      if (checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter(item => item !== id);
      }
    });
  };



  console.log(selected);

  return (
    <div>
      <form>
        {rows.map(row => (
          <div key={row.id}>
            <label>
              <input
                type="checkbox"
                id={row.id}
                checked={selected.includes(row.id)}
                onChange={handleCheck(row.id)}
              />
              {row.name}
            </label>
          </div>
        ))}
      </form>

    </div>
  );
};

export default MyComponent;

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const CheckboxList = ({ data }) => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems({ ...checkedItems, [name]: checked });
    };

    return (
        <div>
            {data.map((item, index) => (
                <Form.Check
                    key={item.id} // Assuming each item has a unique identifier 'id'
                    type="checkbox"
                    id={`checkbox-${item.id}`} // Unique ID for each checkbox
                    label={item.label} // Assuming there's a label associated with each item
                    name={`checkbox-${item.id}`} // Assigning a unique name for each checkbox
                    checked={checkedItems[`checkbox-${item.id}`] || false}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
};

export default CheckboxList;

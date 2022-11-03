import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

/* step5:
house_rules */
const Step5 = ({ formData, setFormData }) => {

    const [rulesData, setRulesData] = useState([]);

    const [newRule, setNewRule] = useState('');

    const addRule = () => {
        let data = rulesData;
        data.push(newRule);
        setRulesData(data);
        console.log(rulesData);
        setNewRule("");
        setFormData({ ...formData, house_rules: rulesData });
    }

    const renderHouseRules = () => formData.house_rules?.map((item, index) =>
        <li key={index}>{item}</li>
    )

    const setCheckinTime = (e) => {
        console.log(e);
        setFormData({ ...formData, checkin_time: e })
        console.log(formData.checkin_time)
    }

    const setCheckoutTime = (e) => {
        console.log(e);
        setFormData({ ...formData, checkout_time: e })
        console.log(formData.checkout_time)
    }

    return (
        <div>
            <div className='row'>
                <div className='col'>
                    <label>Checkin time</label>
                </div>
                <div className='col'>
                    <TimePicker
                        placeholder="Select Time"
                        showSecond={false}
                        focusOnOpen={true}
                        format="HH:mm"
                        minuteStep={30}
                        value={formData.checkin_time}
                        onChange={e => setCheckinTime(e)}
                        style={{ width: 100 }}
                    />

                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label>Checkout time</label>
                </div>
                <div className='col'>
                    <TimePicker
                        placeholder="Select Time"
                        showSecond={false}
                        focusOnOpen={true}
                        format="HH:mm"
                        minuteStep={30}
                        value={formData.checkout_time}
                        onChange={e => setCheckoutTime(e)}
                        style={{ width: 100 }}
                    />

                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <input className="form-control"
                        placeholder='Add rules'
                        name="Add rules"
                        type="text"
                        onChange={(e) => { setNewRule(e.target.value) }}
                        value={newRule}
                        required
                    />
                </div>
                <div className='col'>
                    <button
                        className='btn btn-primary'
                        type="button"
                        name='Add'
                        onClick={addRule}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
            <div className='row'>
                <ul>
                    {renderHouseRules()}
                </ul>
            </div>
        </div>
    )
}

export default Step5

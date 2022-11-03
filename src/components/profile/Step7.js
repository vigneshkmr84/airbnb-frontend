import React from 'react'
import { makeFirstLetterCaps } from '../common/CommonUtils';

/* step7:
Cancellation Policy */
const Step7 = ({ formData, setFormData }) => {

    const cancelRules = ['No Cancellation', '48 Hour Full refund', '24 Hour before 30% refund', 'Less than 24 hour, No refund'];

    const generateOptions = () => {
        return (
            cancelRules.map((e, i) => {
                return (
                    <option key={i} value={e}>{makeFirstLetterCaps(e)}</option>
                )
            }
            )
        )
    }

    return (
        <div className='container-sm'>
            <div className='row'>
                <select
                    className="form-select input-sm"
                    onChange={(e) => setFormData({ ...formData, cancellation_policy: e.target.value })}
                    value={formData.cancellation_policy}>
                    {generateOptions()}
                </select>
            </div>
        </div>
    )
}

export default Step7
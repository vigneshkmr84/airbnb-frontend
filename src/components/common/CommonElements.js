
export function renderSubmitButton() {
    return (
        <>
            <i className="bi bi-check2"></i>&nbsp; Submit
        </>
    )
}

export function renderCancelButton() {
    return (
        <>
            <i className="bi bi-x"></i>&nbsp; Cancel
        </>
    )
}


export const renderSpinner = () => {
    return (
        <div className="d-flex justify-content-center" style={{ paddingTop: '10%' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}